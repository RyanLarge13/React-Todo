"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var framer_motion_1 = require("framer-motion");
var Nav = function (_a) {
    var user = _a.user, setUser = _a.setUser, setNav = _a.setNav;
    var logOut = function () {
        setNav(false);
        setUser(false);
        localStorage.removeItem("token");
    };
    return (React.createElement(framer_motion_1.motion.nav, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "fixed inset-0 bg-[rgba(0,0,0,0.4)] flex flex-col justify-center items-center" },
        React.createElement("ul", null,
            React.createElement(framer_motion_1.motion.li, { whileHover: { rotate: [0, 10, -10, 0] }, animate: { scale: [0, 1.1, 1] }, className: "my-10" },
                React.createElement("a", { href: "/", className: "px-20 py-5 rounded-md shadow-md bg-gradient-to-r from-amber-500 to-rose-400 text-white text-xl" }, "Home")),
            user && (React.createElement(framer_motion_1.motion.li, { whileHover: { rotate: [0, 10, -10, 0] }, animate: { scale: [0, 1.1, 1] }, className: "my-10" },
                React.createElement("button", { onClick: function () { return logOut(); }, className: "px-20 py-5 rounded-md shadow-md bg-gradient-to-r from-amber-500 to-rose-400 text-white text-xl" }, "Logout"))))));
};
exports.default = Nav;
