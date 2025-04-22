"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inBrowser = exports.sleep = exports.requestAnimationFrameAsync = exports.inRange = exports.sum = void 0;
function sum() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.reduce(function (acc, curr) { return acc + curr; }, 0);
}
exports.sum = sum;
function inRange(value, start, end) {
    return value >= start && value <= end;
}
exports.inRange = inRange;
function requestAnimationFrameAsync() {
    return new Promise(function (resolve) {
        requestAnimationFrame(resolve);
    });
}
exports.requestAnimationFrameAsync = requestAnimationFrameAsync;
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
exports.sleep = sleep;
function inBrowser() {
    return typeof window !== "undefined";
}
exports.inBrowser = inBrowser;
