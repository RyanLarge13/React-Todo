"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var bs_1 = require("react-icons/bs");
var ai_1 = require("react-icons/ai");
var AddButtons = function (_a) {
    var add = _a.add;
    var _b = (0, react_1.useState)(false), addToDo = _b[0], setAddToDo = _b[1];
    var _c = (0, react_1.useState)(""), input = _c[0], setInput = _c[1];
    var handleChange = function (e) {
        var value = e.target.value;
        setInput(value);
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        add(input);
        setInput("");
        setAddToDo(false);
    };
    return (React.createElement(React.Fragment, null,
        addToDo && (React.createElement(framer_motion_1.motion.form, { className: " p-5 fixed bottom-0 left-0 right-0 bg-white rounded-md shadow-md flex flex-col items-center justify-center z-0", initial: { opacity: 0, y: "100%" }, animate: {
                opacity: 1,
                y: 0,
                transition: { type: "spring", stiffness: 400 },
            }, onSubmit: handleSubmit },
            React.createElement(framer_motion_1.motion.input, { onChange: handleChange, placeholder: "Todo", value: input, className: "mx-auto w-[80%] p-3 rounded-md shadow-md text-center focus:outline-none" }),
            React.createElement(framer_motion_1.motion.button, { type: "submit", className: "px-10 py-2 my-5 mx-20 rounded-md shadow-md text-center bg-gradient-to-r from-pink-300 to-rose-400" }, "Add"))),
        React.createElement(framer_motion_1.motion.div, { className: "px-10 py-2 mb-5 mx-20 rounded-md shadow-md flex flex-col items-center justify-center bg-gradient-to-r from-pink-300 to-rose-400", onClick: function () { return setAddToDo(function (prev) { return !prev; }); }, whileInView: { scale: [0, 1.2, 1] }, whileTap: { rotate: [0, 10, -10, 5, -5, 0] } },
            addToDo ? React.createElement(ai_1.AiFillMinusCircle, null) : React.createElement(bs_1.BsPlusCircleFill, null),
            React.createElement("h2", null,
                addToDo ? "Cancel" : "Add To Doo",
                " "))));
};
exports.default = AddButtons;
