"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.useChromeTabs = void 0;
var react_1 = __importStar(require("react"));
var chrome_tabs_1 = __importDefault(require("../chrome-tabs"));
var useLatest_1 = require("./useLatest");
var ChromeTabsWrapper = (0, react_1.forwardRef)(function (props, ref) {
    var classList = ["chrome-tabs"];
    if (props.darkMode) {
        classList.push("chrome-tabs-dark-theme");
    }
    if (props.className) {
        classList.push(props.className);
    }
    return (react_1.default.createElement("div", { ref: ref, className: classList.join(" "), style: { "--tab-content-margin": "9px", display: "flex" } },
        react_1.default.createElement("div", { className: "chrome-tabs-content" }),
        react_1.default.createElement("div", { className: "chrome-tabs-toolbar-right", style: { zIndex: 1, position: "relative" } }, props.toolbar || null),
        react_1.default.createElement("div", { className: "chrome-tabs-bottom-bar" })));
});
function useChromeTabs(listeners) {
    var ref = (0, react_1.useRef)(null);
    var chromeTabsRef = (0, react_1.useRef)(null);
    var listenersLest = (0, useLatest_1.useLatest)(listeners);
    (0, react_1.useEffect)(function () {
        var chromeTabs = new chrome_tabs_1.default();
        chromeTabsRef.current = chromeTabs;
        chromeTabs.init(ref.current);
        return function () {
            chromeTabs.destroy();
        };
    }, []);
    // activated
    (0, react_1.useEffect)(function () {
        var _a;
        var listener = function (_a) {
            var _b, _c;
            var detail = _a.detail;
            var tabEle = detail.tabEl;
            var tabId = tabEle.getAttribute("data-tab-id");
            (_c = (_b = listenersLest.current).onTabActive) === null || _c === void 0 ? void 0 : _c.call(_b, tabId);
        };
        var ele = (_a = chromeTabsRef.current) === null || _a === void 0 ? void 0 : _a.el;
        ele === null || ele === void 0 ? void 0 : ele.addEventListener("tabClick", listener);
        return function () {
            ele === null || ele === void 0 ? void 0 : ele.removeEventListener("tabClick", listener);
        };
    }, []);
    (0, react_1.useEffect)(function () {
        var _a;
        var ele = (_a = chromeTabsRef.current) === null || _a === void 0 ? void 0 : _a.el;
        var listener = function (_a) {
            var _b, _c;
            var detail = _a.detail;
            var tabEle = detail.tabEl, originIndex = detail.originIndex, destinationIndex = detail.destinationIndex;
            var tabId = tabEle.getAttribute("data-tab-id");
            (_c = (_b = listenersLest.current).onTabReorder) === null || _c === void 0 ? void 0 : _c.call(_b, tabId, originIndex, destinationIndex);
        };
        ele === null || ele === void 0 ? void 0 : ele.addEventListener("tabReorder", listener);
        return function () {
            ele === null || ele === void 0 ? void 0 : ele.removeEventListener("tabReorder", listener);
        };
    }, []);
    (0, react_1.useEffect)(function () {
        var _a;
        var ele = (_a = chromeTabsRef.current) === null || _a === void 0 ? void 0 : _a.el;
        var listener = function (_a) {
            var _b, _c;
            var detail = _a.detail;
            var tabEle = detail.tabEl;
            var tabId = tabEle.getAttribute("data-tab-id");
            (_c = (_b = listenersLest.current).onTabClose) === null || _c === void 0 ? void 0 : _c.call(_b, tabId);
        };
        ele === null || ele === void 0 ? void 0 : ele.addEventListener("tabClose", listener);
        return function () {
            ele === null || ele === void 0 ? void 0 : ele.removeEventListener("tabClose", listener);
        };
    }, []);
    (0, react_1.useEffect)(function () {
        var _a;
        var listener = function () {
            var _a, _b;
            (_b = (_a = listenersLest.current).onDragBegin) === null || _b === void 0 ? void 0 : _b.call(_a);
        };
        var ele = (_a = chromeTabsRef.current) === null || _a === void 0 ? void 0 : _a.el;
        ele === null || ele === void 0 ? void 0 : ele.addEventListener("dragBegin", listener);
        return function () {
            ele === null || ele === void 0 ? void 0 : ele.removeEventListener("dragBegin", listener);
        };
    }, []);
    (0, react_1.useEffect)(function () {
        var _a;
        var ele = (_a = chromeTabsRef.current) === null || _a === void 0 ? void 0 : _a.el;
        var listener = function (_a) {
            var _b, _c;
            var detail = _a.detail;
            var tabEle = detail.tabEl;
            if (!tabEle) {
                return;
            }
            var tabId = tabEle.getAttribute("data-tab-id");
            (_c = (_b = listenersLest.current).onContextMenu) === null || _c === void 0 ? void 0 : _c.call(_b, tabId, detail.event);
        };
        ele === null || ele === void 0 ? void 0 : ele.addEventListener("contextmenu", listener);
        return function () {
            ele === null || ele === void 0 ? void 0 : ele.removeEventListener("contextmenu", listener);
        };
    }, []);
    (0, react_1.useEffect)(function () {
        var _a;
        var listener = function () {
            var _a, _b;
            (_b = (_a = listenersLest.current).onDragEnd) === null || _b === void 0 ? void 0 : _b.call(_a);
        };
        var ele = (_a = chromeTabsRef.current) === null || _a === void 0 ? void 0 : _a.el;
        ele === null || ele === void 0 ? void 0 : ele.addEventListener("dragEnd", listener);
        return function () {
            ele === null || ele === void 0 ? void 0 : ele.removeEventListener("dragEnd", listener);
        };
    }, []);
    var addTab = (0, react_1.useCallback)(function (tab) {
        var _a;
        (_a = chromeTabsRef.current) === null || _a === void 0 ? void 0 : _a.addTab(tab);
    }, []);
    var removeTab = (0, react_1.useCallback)(function (tabId) {
        var _a, _b;
        var ele = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.querySelector("[data-tab-id=\"".concat(tabId, "\"]"));
        if (ele) {
            (_b = chromeTabsRef.current) === null || _b === void 0 ? void 0 : _b.removeTab(ele);
        }
    }, []);
    var activeTab = (0, react_1.useCallback)(function (tabId) {
        var _a, _b, _c;
        var ele = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.querySelector("[data-tab-id=\"".concat(tabId, "\"]"));
        if (ele !== ((_b = chromeTabsRef.current) === null || _b === void 0 ? void 0 : _b.activeTabEl)) {
            (_c = chromeTabsRef.current) === null || _c === void 0 ? void 0 : _c.setCurrentTab(ele);
        }
    }, []);
    var updateTab = (0, react_1.useCallback)(function (tabId, tab) {
        var _a, _b, _c;
        var ele = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.querySelector("[data-tab-id=\"".concat(tabId, "\"]"));
        if (ele) {
            (_b = chromeTabsRef.current) === null || _b === void 0 ? void 0 : _b.updateTab(ele, __assign({}, tab));
        }
        else {
            (_c = chromeTabsRef.current) === null || _c === void 0 ? void 0 : _c.addTab(tab);
        }
    }, []);
    var updateTabByIndex = (0, react_1.useCallback)(function (index, tab) {
        var _a, _b, _c;
        var tabs = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.querySelectorAll(".chrome-tab");
        if (tabs) {
            var ele = tabs.item(index);
            if (ele) {
                (_b = chromeTabsRef.current) === null || _b === void 0 ? void 0 : _b.updateTab(ele, __assign({}, tab));
            }
            else {
                (_c = chromeTabsRef.current) === null || _c === void 0 ? void 0 : _c.addTab(tab);
            }
        }
    }, []);
    var ChromeTabs = (0, react_1.useCallback)(function ChromeTabs(props) {
        return react_1.default.createElement(ChromeTabsWrapper, __assign({}, props, { ref: ref }));
    }, []);
    return {
        ChromeTabs: ChromeTabs,
        addTab: addTab,
        updateTab: updateTab,
        removeTab: removeTab,
        activeTab: activeTab,
        updateTabByIndex: updateTabByIndex,
    };
}
exports.useChromeTabs = useChromeTabs;
