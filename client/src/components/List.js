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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ai_1 = require("react-icons/ai");
var react_spinners_1 = require("react-spinners");
var framer_motion_1 = require("framer-motion");
var AddButtons_1 = require("./AddButtons");
var List = function (_a) {
    var user = _a.user;
    var _b = (0, react_1.useState)([]), items = _b[0], setItems = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    (0, react_1.useEffect)(function () {
        fetch("http://localhost:8080/".concat(user.id, "/todos"), {
            method: "GET",
        })
            .then(function (res) { return res.json(); })
            .then(function (data) {
            setItems(data.todos);
        });
        setLoading(false);
    }, [user.id]);
    var addTodo = function (todo) { return __awaiter(void 0, void 0, void 0, function () {
        var theTodo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    theTodo = {
                        value: todo,
                        complete: false,
                        createdAt: new Date(),
                    };
                    return [4 /*yield*/, fetch("http://localhost:8080/".concat(user.id, "/").concat(todo), {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(theTodo),
                        })
                            .then(function (res) { return res.json(); })
                            .then(function (data) {
                            setItems(function (prev) { return __spreadArray(__spreadArray([], prev, true), [data.todo], false); });
                        })];
                case 1:
                    _a.sent();
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var deleteTodo = function (item) { return __awaiter(void 0, void 0, void 0, function () {
        var newList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:8080/delete/".concat(item._id), {
                        method: "DELETE",
                    })
                        .then(function (res) { return res.json(); })
                        .then(function (data) {
                        console.log(data.message);
                    })];
                case 1:
                    _a.sent();
                    newList = items.filter(function (i) { return i._id !== item._id; });
                    setItems(newList);
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("section", { className: "w-full mt-10" },
        React.createElement(AddButtons_1.default, { add: function (todo) { return addTodo(todo); } }),
        React.createElement("div", { className: "p-5 my-10 rounded-md shadow-md bg-gradient-to-r from-cyan-400 to-blue-300 w-[90%] mx-auto" }, !loading ? (React.createElement(framer_motion_1.Reorder.Group, { axis: "y", values: items, onReorder: setItems }, items.length > 0 ? (items.map(function (item, index) { return (React.createElement(framer_motion_1.Reorder.Item, { className: "p-5 my-5 rounded-md shadow-md bg-white flex justify-between items-center", key: item._id, value: item, whileInView: { scale: [1.1, 1.1, 0.9, 1] }, whileTap: { scale: 1.1 } },
            React.createElement("p", null, index + 1),
            React.createElement("p", { className: "mx-5" }, item.todo),
            React.createElement(ai_1.AiFillCloseCircle, { onClick: function () { return deleteTodo(item); } }))); })) : (React.createElement("p", { className: "text-center text-2xl text-white" }, "Fill Me!!")))) : (React.createElement(react_spinners_1.SyncLoader, null)))));
};
exports.default = List;
