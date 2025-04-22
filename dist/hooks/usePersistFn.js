"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePersistFn = void 0;
var react_1 = require("react");
var useLatest_1 = require("./useLatest");
function usePersistFn(fn) {
    var latest = (0, useLatest_1.useLatest)(fn);
    return (0, react_1.useCallback)(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return latest.current.apply(latest, args);
    }, []);
}
exports.usePersistFn = usePersistFn;
