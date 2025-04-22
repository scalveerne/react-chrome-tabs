"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var draggabilly_1 = __importDefault(require("draggabilly"));
var util_1 = require("./utils/util");
var TAB_CONTENT_MARGIN = 9;
var TAB_CONTENT_OVERLAP_DISTANCE = 1;
var TAB_OVERLAP_DISTANCE = TAB_CONTENT_MARGIN * 2 + TAB_CONTENT_OVERLAP_DISTANCE;
var TAB_CONTENT_MIN_WIDTH = 60;
var TAB_CONTENT_MAX_WIDTH = 240;
var TAB_SIZE_SMALL = 84;
var TAB_SIZE_SMALLER = 60;
var TAB_SIZE_MINI = 48;
var noop = function (_) { };
var closest = function (value, array) {
    var closest = Infinity;
    var closestIndex = -1;
    array.forEach(function (v, i) {
        if (Math.abs(value - v) < closest) {
            closest = Math.abs(value - v);
            closestIndex = i;
        }
    });
    return closestIndex;
};
var tabTemplate = "\n      <div class=\"chrome-tab\">\n        <div class=\"chrome-tab-dividers\"></div>\n        <div class=\"chrome-tab-background\">\n          <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"><defs><symbol id=\"chrome-tab-geometry-left\" viewBox=\"0 0 214 36\"><path d=\"M17 0h197v36H0v-2c4.5 0 9-3.5 9-8V8c0-4.5 3.5-8 8-8z\"/></symbol><symbol id=\"chrome-tab-geometry-right\" viewBox=\"0 0 214 36\"><use xlink:href=\"#chrome-tab-geometry-left\"/></symbol><clipPath id=\"crop\"><rect class=\"mask\" width=\"100%\" height=\"100%\" x=\"0\"/></clipPath></defs><svg width=\"52%\" height=\"100%\"><use xlink:href=\"#chrome-tab-geometry-left\" width=\"214\" height=\"36\" class=\"chrome-tab-geometry\"/></svg><g transform=\"scale(-1, 1)\"><svg width=\"52%\" height=\"100%\" x=\"-100%\" y=\"0\"><use xlink:href=\"#chrome-tab-geometry-right\" width=\"214\" height=\"36\" class=\"chrome-tab-geometry\"/></svg></g></svg>\n        </div>\n        <div class=\"chrome-tab-content\">\n          <div class=\"chrome-tab-favicon\"></div>\n          <div class=\"chrome-tab-title\"></div>\n          <div class=\"chrome-tab-drag-handle\"></div>\n          <div class=\"chrome-tab-close\"></div>\n        </div>\n      </div>\n    ";
var defaultTapProperties = {
    title: "New tab",
    favicon: false,
};
util_1.inRange;
var instanceId = 0;
var ChromeTabs = /** @class */ (function () {
    function ChromeTabs() {
        var _this = this;
        this.isMouseEnter = false;
        this.mouseEnterLayoutResolve = null;
        this.translateX = 0;
        this.onResize = function () {
            _this.cleanUpPreviouslyDraggedTabs();
            _this.layoutTabs();
        };
        this.onMouseLeave = function () {
            _this.isMouseEnter = false;
            if (_this.mouseEnterLayoutResolve) {
                _this.mouseEnterLayoutResolve();
                _this.mouseEnterLayoutResolve = null;
            }
        };
        this.layoutPromise = null;
        this.draggabillies = [];
    }
    ChromeTabs.prototype.init = function (el) {
        this.el = el;
        this.instanceId = instanceId;
        this.el.setAttribute("data-chrome-tabs-instance-id", this.instanceId + "");
        instanceId += 1;
        this.setupCustomProperties();
        this.setupStyleEl();
        this.setupEvents();
        this.layoutTabs();
        this.setupDraggabilly();
    };
    ChromeTabs.prototype.emit = function (eventName, data) {
        this.el.dispatchEvent(new CustomEvent(eventName, { detail: data }));
    };
    ChromeTabs.prototype.setupCustomProperties = function () {
        this.el.style.setProperty("--tab-content-margin", "".concat(TAB_CONTENT_MARGIN, "px"));
    };
    ChromeTabs.prototype.setupStyleEl = function () {
        this.styleEl = document.createElement("style");
        this.el.appendChild(this.styleEl);
    };
    ChromeTabs.prototype.setupEvents = function () {
        var _this = this;
        if ((0, util_1.inBrowser)()) {
            window.addEventListener("resize", this.onResize);
        }
        // this.el.addEventListener("dblclick", (event) => {
        //   if ([this.el, this.tabContentEl].includes(event.target as HTMLElement))
        //     this.addTab();
        // });
        this.el.addEventListener("mouseenter", function () {
            _this.isMouseEnter = true;
        });
        this.el.addEventListener("mouseleave", this.onMouseLeave);
        // When the page visibility status changes, it is triggered immediately
        document.addEventListener("visibilitychange", this.onMouseLeave);
        this.tabEls.forEach(function (tabEl) { return _this.setTabCloseEventListener(tabEl); });
        this.tabContentEl.addEventListener("wheel", function (event) {
            var tabsWidth = _this.getTabsWidth();
            var clientWidth = _this.tabContentEl.clientWidth;
            if (clientWidth >= tabsWidth) {
                _this.translateX = 0;
            }
            else {
                var sign = event.deltaY > 0 ? 1 : -1;
                var delta = (sign * (tabsWidth - clientWidth)) / 3;
                _this.translateX = Math.min(0, Math.max(_this.translateX - delta, clientWidth - tabsWidth));
            }
            _this.tabContentEl.style.transform = "translateX(".concat(_this.translateX, "px)");
        });
        this.el.addEventListener("activeTabChange", function (event) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.layoutPromise];
                    case 1:
                        _a.sent(); // Wait for the layout to finish
                        this.translateToView();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    Object.defineProperty(ChromeTabs.prototype, "tabEls", {
        get: function () {
            return Array.prototype.slice.call(this.el.querySelectorAll(".chrome-tab"));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChromeTabs.prototype, "tabContentEl", {
        get: function () {
            return this.el.querySelector(".chrome-tabs-content");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChromeTabs.prototype, "toolbarEl", {
        get: function () {
            return this.el.querySelector(".chrome-tabs-toolbar-right");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChromeTabs.prototype, "tabContentWidths", {
        get: function () {
            var numberOfTabs = this.tabEls.length;
            var tabsContentWidth = this.el.clientWidth - this.toolbarEl.clientWidth - 16;
            var tabsCumulativeOverlappedWidth = (numberOfTabs - 1) * TAB_CONTENT_OVERLAP_DISTANCE;
            var targetWidth = (tabsContentWidth -
                2 * TAB_CONTENT_MARGIN +
                tabsCumulativeOverlappedWidth) /
                numberOfTabs;
            var clampedTargetWidth = Math.max(TAB_CONTENT_MIN_WIDTH, Math.min(TAB_CONTENT_MAX_WIDTH, targetWidth));
            var flooredClampedTargetWidth = Math.floor(clampedTargetWidth);
            var totalTabsWidthUsingTarget = flooredClampedTargetWidth * numberOfTabs +
                2 * TAB_CONTENT_MARGIN -
                tabsCumulativeOverlappedWidth;
            var totalExtraWidthDueToFlooring = tabsContentWidth - totalTabsWidthUsingTarget;
            // TODO - Support tabs with different widths / e.g. "pinned" tabs
            var widths = [];
            var extraWidthRemaining = totalExtraWidthDueToFlooring;
            for (var i = 0; i < numberOfTabs; i += 1) {
                var extraWidth = flooredClampedTargetWidth < TAB_CONTENT_MAX_WIDTH &&
                    extraWidthRemaining > 0
                    ? 1
                    : 0;
                widths.push(flooredClampedTargetWidth + extraWidth);
                if (extraWidthRemaining > 0)
                    extraWidthRemaining -= 1;
            }
            return widths;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChromeTabs.prototype, "tabContentPositions", {
        get: function () {
            var positions = [];
            var tabContentWidths = this.tabContentWidths;
            var position = TAB_CONTENT_MARGIN;
            tabContentWidths.forEach(function (width, i) {
                var offset = i * TAB_CONTENT_OVERLAP_DISTANCE;
                positions.push(position - offset);
                position += width;
            });
            return positions;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChromeTabs.prototype, "tabPositions", {
        get: function () {
            var positions = [];
            this.tabContentPositions.forEach(function (contentPosition) {
                positions.push(contentPosition - TAB_CONTENT_MARGIN);
            });
            return positions;
        },
        enumerable: false,
        configurable: true
    });
    ChromeTabs.prototype.doLayout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tabContentWidths, styleHTML;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tabContentWidths = this.tabContentWidths;
                        this.tabEls.forEach(function (tabEl, i) {
                            var contentWidth = tabContentWidths[i];
                            var width = contentWidth + 2 * TAB_CONTENT_MARGIN;
                            tabEl.style.width = width + "px";
                            tabEl.removeAttribute("is-small");
                            tabEl.removeAttribute("is-smaller");
                            tabEl.removeAttribute("is-mini");
                            if (contentWidth < TAB_SIZE_SMALL)
                                tabEl.setAttribute("is-small", "");
                            if (contentWidth < TAB_SIZE_SMALLER)
                                tabEl.setAttribute("is-smaller", "");
                            if (contentWidth < TAB_SIZE_MINI)
                                tabEl.setAttribute("is-mini", "");
                        });
                        styleHTML = "";
                        this.tabPositions.forEach(function (position, i) {
                            styleHTML += "\n              .chrome-tabs[data-chrome-tabs-instance-id=\"".concat(_this.instanceId, "\"] .chrome-tab:nth-child(").concat(i + 1, ") {\n                transform: translate3d(").concat(position, "px, 0, 0)\n              }\n            ");
                        });
                        this.styleEl.innerHTML = styleHTML;
                        return [4 /*yield*/, this.justifyContentWidth()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChromeTabs.prototype.layoutTabs = function () {
        this.layoutPromise = this.doLayout();
        return this.layoutPromise;
    };
    ChromeTabs.prototype.getTabsWidth = function () {
        var contentWidths = this.tabEls.map(function (tabEl) {
            return tabEl.querySelector(".chrome-tab-drag-handle").getBoundingClientRect()
                .width;
        });
        var width = util_1.sum.apply(void 0, contentWidths);
        var contentWith = width +
            8 -
            Math.max(contentWidths.length - 1, 0) * TAB_CONTENT_OVERLAP_DISTANCE;
        return contentWith;
    };
    ChromeTabs.prototype.justifyContentWidth = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, util_1.requestAnimationFrameAsync)()];
                    case 1:
                        _a.sent();
                        this.tabContentEl.style.width = this.getTabsWidth() + "px";
                        return [2 /*return*/];
                }
            });
        });
    };
    ChromeTabs.prototype.translateToView = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tabsWidth, tabWidth, clientWidth, index, currentX, left, right, isInRange;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, util_1.requestAnimationFrameAsync)()];
                    case 1:
                        _a.sent();
                        tabsWidth = this.getTabsWidth();
                        tabWidth = tabsWidth / this.tabEls.length;
                        clientWidth = this.tabContentEl.clientWidth;
                        index = this.tabEls.indexOf(this.activeTabEl);
                        if (index === -1)
                            return [2 /*return*/];
                        if (clientWidth >= tabsWidth) {
                            this.translateX = 0;
                        }
                        else {
                            currentX = index * tabWidth;
                            left = Math.max(-currentX, clientWidth - tabsWidth);
                            right = Math.max(-currentX + tabWidth, clientWidth - tabsWidth);
                            isInRange = (0, util_1.inRange)(this.translateX, left, right);
                            this.translateX = Math.min(0, isInRange ? this.translateX : (left + right) / 2);
                        }
                        this.tabContentEl.style.transform = "translateX(".concat(this.translateX, "px)");
                        return [2 /*return*/];
                }
            });
        });
    };
    ChromeTabs.prototype.createNewTabEl = function () {
        var div = document.createElement("div");
        div.innerHTML = tabTemplate;
        return div.firstElementChild;
    };
    ChromeTabs.prototype.addTab = function (tabProperties, _a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, _c = _b.animate, animate = _c === void 0 ? true : _c, _d = _b.background, background = _d === void 0 ? false : _d;
        var tabEl = this.createNewTabEl();
        tabEl.oncontextmenu = function (event) {
            _this.emit("contextmenu", { tabEl: tabEl, event: event });
        };
        if (animate) {
            tabEl.classList.add("chrome-tab-was-just-added");
            setTimeout(function () { return tabEl.classList.remove("chrome-tab-was-just-added"); }, 500);
        }
        tabProperties = Object.assign({}, defaultTapProperties, tabProperties);
        var showCloseButton = tabProperties.isCloseIconVisible !== false;
        if (!showCloseButton) {
            tabEl.classList.add("chrome-tab-no-close");
        }
        else {
            tabEl.classList.remove("chrome-tab-no-close");
        }
        this.tabContentEl.appendChild(tabEl);
        this.setTabCloseEventListener(tabEl);
        this.updateTab(tabEl, tabProperties);
        this.emit("tabAdd", { tabEl: tabEl });
        if (!background)
            this.setCurrentTab(tabEl);
        this.cleanUpPreviouslyDraggedTabs();
        this.layoutTabs();
        this.setupDraggabilly();
        return tabEl;
    };
    ChromeTabs.prototype.setTabCloseEventListener = function (tabEl) {
        var _this = this;
        tabEl.querySelector(".chrome-tab-close").addEventListener("click", function (_) {
            _.stopImmediatePropagation();
            // this.removeTab(tabEl);
            _this.emit("tabClose", { tabEl: tabEl });
        });
    };
    Object.defineProperty(ChromeTabs.prototype, "activeTabEl", {
        get: function () {
            return this.el.querySelector(".chrome-tab[active]");
        },
        enumerable: false,
        configurable: true
    });
    ChromeTabs.prototype.hasActiveTab = function () {
        return !!this.activeTabEl;
    };
    ChromeTabs.prototype.setCurrentTab = function (tabEl) {
        var activeTabEl = this.activeTabEl;
        if (activeTabEl === tabEl)
            return;
        if (activeTabEl)
            activeTabEl.removeAttribute("active");
        tabEl.setAttribute("active", "");
        this.emit("activeTabChange", { tabEl: tabEl });
    };
    ChromeTabs.prototype.removeTab = function (tabEl) {
        var _this = this;
        if (tabEl === this.activeTabEl) {
            if (tabEl.nextElementSibling) {
                this.setCurrentTab(tabEl.nextElementSibling);
            }
            else if (tabEl.previousElementSibling) {
                this.setCurrentTab(tabEl.previousElementSibling);
            }
        }
        tabEl.parentNode.removeChild(tabEl);
        this.emit("tabRemove", { tabEl: tabEl });
        this.cleanUpPreviouslyDraggedTabs();
        if (this.isMouseEnter) {
            this.justifyContentWidth();
            if (!this.mouseEnterLayoutResolve) {
                new Promise(function (resolve) {
                    _this.mouseEnterLayoutResolve = resolve;
                })
                    .then(function () { return _this.layoutTabs(); })
                    .then(function () { return _this.translateToView(); });
            }
        }
        else {
            this.layoutTabs().then(function () { return _this.translateToView(); });
        }
        this.setupDraggabilly();
    };
    ChromeTabs.prototype.updateTab = function (tabEl, tabProperties) {
        tabEl.querySelector(".chrome-tab-title").textContent = tabProperties.title;
        var faviconEl = tabEl.querySelector(".chrome-tab-favicon");
        var favicon = tabProperties.favicon, faviconClass = tabProperties.faviconClass;
        faviconEl.className = "chrome-tab-favicon";
        faviconEl.style.backgroundImage = "";
        if (favicon || faviconClass) {
            if (faviconClass) {
                faviconEl.className = ["chrome-tab-favicon", faviconClass].join(" ");
            }
            if (favicon) {
                faviconEl.style.backgroundImage = "url('".concat(favicon, "')");
            }
            faviconEl === null || faviconEl === void 0 ? void 0 : faviconEl.removeAttribute("hidden");
        }
        else {
            faviconEl === null || faviconEl === void 0 ? void 0 : faviconEl.setAttribute("hidden", "");
            faviconEl === null || faviconEl === void 0 ? void 0 : faviconEl.removeAttribute("style");
        }
        if (tabProperties.id) {
            tabEl.setAttribute("data-tab-id", tabProperties.id);
        }
    };
    ChromeTabs.prototype.cleanUpPreviouslyDraggedTabs = function () {
        this.tabEls.forEach(function (tabEl) {
            return tabEl.classList.remove("chrome-tab-was-just-dragged");
        });
    };
    ChromeTabs.prototype.setupDraggabilly = function () {
        var _this = this;
        var tabEls = this.tabEls;
        var tabPositions = this.tabPositions;
        if (this.isDragging) {
            this.isDragging = false;
            this.el.classList.remove("chrome-tabs-is-sorting");
            this.draggabillyDragging.element.classList.remove("chrome-tab-is-dragging");
            this.draggabillyDragging.element.style.transform = "";
            this.draggabillyDragging.dragEnd();
            this.draggabillyDragging.isDragging = false;
            this.draggabillyDragging.positionDrag = noop; // Prevent Draggabilly from updating tabEl.style.transform in later frames
            this.draggabillyDragging.destroy();
            this.draggabillyDragging = null;
        }
        this.draggabillies.forEach(function (d) { return d.destroy(); });
        tabEls.forEach(function (tabEl, originalIndex) {
            var originalTabPositionX = tabPositions[originalIndex];
            var draggabilly = new draggabilly_1.default(tabEl, {
                axis: "x",
                handle: ".chrome-tab-drag-handle",
                containment: false,
            });
            _this.draggabillies.push(draggabilly);
            draggabilly.on("pointerDown", function (_) {
                _this.emit("tabClick", { tabEl: tabEl });
                // this.setCurrentTab(tabEl);
            });
            draggabilly.on("dragStart", function (_) {
                _this.isDragging = true;
                _this.draggabillyDragging = draggabilly;
                tabEl.classList.add("chrome-tab-is-dragging");
                _this.el.classList.add("chrome-tabs-is-sorting");
                _this.emit("dragStart", {});
            });
            draggabilly.on("dragEnd", function (_) {
                _this.isDragging = false;
                var finalTranslateX = parseFloat(tabEl.style.left);
                tabEl.style.transform = "translate3d(0, 0, 0)";
                _this.emit("dragEnd", {});
                // Animate dragged tab back into its place
                requestAnimationFrame(function (_) {
                    tabEl.style.left = "0";
                    tabEl.style.transform = "translate3d(".concat(finalTranslateX, "px, 0, 0)");
                    requestAnimationFrame(function (_) {
                        tabEl.classList.remove("chrome-tab-is-dragging");
                        _this.el.classList.remove("chrome-tabs-is-sorting");
                        tabEl.classList.add("chrome-tab-was-just-dragged");
                        requestAnimationFrame(function (_) {
                            tabEl.style.transform = "";
                            _this.layoutTabs();
                            _this.setupDraggabilly();
                        });
                    });
                });
            });
            var handleDragMove = function (event, pointer, moveVector) {
                // Current index be computed within the event since it can change during the dragMove
                var tabEls = _this.tabEls;
                var currentIndex = tabEls.indexOf(tabEl);
                var currentTabPositionX = originalTabPositionX + moveVector.x;
                var tabContent = tabEl.querySelector(".chrome-tab-content");
                var right = currentTabPositionX + tabContent.clientWidth;
                var overLeft = currentTabPositionX < -2;
                var overRight = right > _this.tabContentEl.clientWidth;
                // trick to prevent the tab from being dragged out of the tab bar
                // @see https://github.com/desandro/draggabilly/issues/177#issuecomment-357270225
                if (overLeft || overRight) {
                    draggabilly.off("dragMove", handleDragMove);
                    var x = void 0;
                    if (overLeft) {
                        x = -originalTabPositionX;
                    }
                    else {
                        var RADIUS = 8;
                        var delta = right - _this.tabContentEl.clientWidth + RADIUS;
                        x = moveVector.x - delta;
                    }
                    draggabilly._dragMove(event, pointer, {
                        x: x,
                        y: 0,
                    });
                    draggabilly.on("dragMove", handleDragMove);
                    return;
                }
                var destinationIndexTarget = closest(currentTabPositionX, tabPositions);
                var destinationIndex = Math.max(0, Math.min(tabEls.length, destinationIndexTarget));
                if (currentIndex !== destinationIndex) {
                    _this.animateTabMove(tabEl, currentIndex, destinationIndex);
                }
            };
            draggabilly.on("dragMove", handleDragMove);
        });
    };
    ChromeTabs.prototype.animateTabMove = function (tabEl, originIndex, destinationIndex) {
        // tabEl.style.transform = `translate3d(${-this.translateX}px, 0, 0)`;
        if (destinationIndex < originIndex) {
            tabEl.parentNode.insertBefore(tabEl, this.tabEls[destinationIndex]);
        }
        else {
            tabEl.parentNode.insertBefore(tabEl, this.tabEls[destinationIndex + 1]);
        }
        this.emit("tabReorder", { tabEl: tabEl, originIndex: originIndex, destinationIndex: destinationIndex });
        this.layoutTabs();
    };
    ChromeTabs.prototype.destroy = function () {
        if ((0, util_1.inBrowser)()) {
            window.removeEventListener("resize", this.onResize);
        }
        document.removeEventListener("visibilitychange", this.onMouseLeave);
    };
    return ChromeTabs;
}());
exports.default = ChromeTabs;
