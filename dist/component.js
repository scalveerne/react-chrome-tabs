"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tabs = void 0;
var react_1 = __importStar(require("react"));
var useChromeTabs_1 = require("./hooks/useChromeTabs");
var lodash_isequal_1 = __importDefault(require("lodash.isequal"));
var useLatest_1 = require("./hooks/useLatest");
var usePrevious_1 = require("./hooks/usePrevious");
var usePersistFn_1 = require("./hooks/usePersistFn");
function Tabs(_a) {
    var tabs = _a.tabs, className = _a.className, darkMode = _a.darkMode, onTabActive = _a.onTabActive, onTabClose = _a.onTabClose, onTabReorder = _a.onTabReorder, onContextMenu = _a.onContextMenu, toolbar = _a.pinnedRight;
    var tabsLatest = (0, useLatest_1.useLatest)(tabs);
    var previousTabs = (0, usePrevious_1.usePrevious)(tabs);
    var moveIndex = (0, react_1.useRef)({ tabId: "", fromIndex: -1, toIndex: -1 });
    var handleTabReorder = (0, usePersistFn_1.usePersistFn)(function (tabId, fromIndex, toIndex) {
        var dest = tabsLatest.current.splice(fromIndex, 1)[0];
        tabsLatest.current.splice(toIndex, 0, dest);
        var beforeFromIndex = moveIndex.current.fromIndex;
        moveIndex.current = {
            tabId: tabId,
            fromIndex: beforeFromIndex > -1 ? beforeFromIndex : fromIndex,
            toIndex: toIndex,
        };
    });
    var handleDragEnd = (0, usePersistFn_1.usePersistFn)(function () {
        var _a = moveIndex.current, tabId = _a.tabId, fromIndex = _a.fromIndex, toIndex = _a.toIndex;
        if (fromIndex > -1) {
            onTabReorder === null || onTabReorder === void 0 ? void 0 : onTabReorder(tabId, fromIndex, toIndex);
        }
        moveIndex.current = {
            tabId: "",
            fromIndex: -1,
            toIndex: -1,
        };
    });
    var _b = (0, useChromeTabs_1.useChromeTabs)({
        onTabClose: onTabClose,
        onTabActive: onTabActive,
        onContextMenu: onContextMenu,
        onDragEnd: handleDragEnd,
        onTabReorder: handleTabReorder,
    }), ChromeTabs = _b.ChromeTabs, addTab = _b.addTab, activeTab = _b.activeTab, removeTab = _b.removeTab, updateTab = _b.updateTab, updateTabByIndex = _b.updateTabByIndex;
    (0, react_1.useEffect)(function () {
        var beforeTabs = previousTabs || [];
        if (!(0, lodash_isequal_1.default)(beforeTabs, tabs)) {
            var retainTabs = beforeTabs.slice(tabs.length);
            retainTabs.forEach(function (tab) {
                removeTab(tab.id);
            });
            tabs.forEach(function (tab, index) {
                updateTabByIndex(index, tab);
            });
            tabs.forEach(function (tab) {
                if (tab.active) {
                    activeTab(tab.id);
                }
            });
        }
    }, [tabs]);
    return (react_1.default.createElement(ChromeTabs, { className: className, darkMode: darkMode, toolbar: toolbar }));
}
exports.Tabs = Tabs;
