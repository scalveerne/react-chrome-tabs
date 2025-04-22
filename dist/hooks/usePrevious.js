"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePrevious = void 0;
var react_1 = require("react");
function usePrevious(state) {
    var ref = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        ref.current = state;
    }, [state]);
    return ref.current;
}
exports.usePrevious = usePrevious;
