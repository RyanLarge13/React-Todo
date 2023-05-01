"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var List_1 = require("../List");
var Home = function (_a) {
    var user = _a.user;
    return (React.createElement("section", { className: "flex flex-col items-center justify-center" },
        React.createElement(List_1.default, { user: user })));
};
exports.default = Home;
