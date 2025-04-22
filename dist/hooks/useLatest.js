"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLatest = void 0;
var react_1 = require("react");
function useLatest(data) {
    var ref = (0, react_1.useRef)(data);
    ref.current = data;
    return ref;
}
exports.useLatest = useLatest;
