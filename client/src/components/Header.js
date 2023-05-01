"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Nav_1 = require("./Nav");
var framer_motion_1 = require("framer-motion");
var react_1 = require("react");
var bi_1 = require("react-icons/bi");
var Header = function (_a) {
    var user = _a.user, setUser = _a.setUser;
    var _b = (0, react_1.useState)(false), nav = _b[0], setNav = _b[1];
    return (React.createElement(React.Fragment, null,
        React.createElement("header", { className: "fixed top-0 w-full p-5 rounded-b-md shadow-md bg-gradient-to-r from-rose-400 to-amber-500 flex justify-between items-center text-white text-4xl z-10" },
            React.createElement(framer_motion_1.motion.p, { initial: { x: -200, opacity: 0 }, animate: { x: 0, opacity: 1 }, transition: { duration: 0.5, type: "spring" }, whileInView: { scale: 1.1, rotate: [0, 20, 0, 10, 0] } }, "To-Doo's"),
            React.createElement(bi_1.BiMenuAltRight, { onClick: function () { return setNav(function (prev) { return !prev; }); } })),
        nav && (React.createElement(React.Fragment, null,
            React.createElement(Nav_1.default, { user: user, setUser: setUser, setNav: setNav })))));
};
exports.default = Header;
