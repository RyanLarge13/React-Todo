"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var google_1 = require("@react-oauth/google");
var facebook_login_render_props_1 = require("react-facebook-login/dist/facebook-login-render-props");
var react_github_login_1 = require("react-github-login");
var Signin = function (_a) {
    var setToken = _a.setToken;
    var googleLogin = (0, google_1.useGoogleLogin)({
        onSuccess: function (codeResponse) {
            localStorage.setItem("token", codeResponse.access_token);
            setToken(codeResponse.access_token);
        },
        onError: function (error) { return console.log("Login Failed:", error); },
    });
    var responseFacebook = function (res) {
        console.log(res);
    };
    var onSuccess = function (response) { return console.log(response); };
    var onFailure = function (response) { return console.error(response); };
    return (React.createElement("section", { className: "mt-40 flex flex-col justify-center items-center" },
        React.createElement("h1", { className: "text-5xl text-center" }, "SignIn"),
        React.createElement("div", { className: "mt-20 flex flex-col justify-center items-center w-full" },
            React.createElement("button", { onClick: function () { return googleLogin(); }, className: "w-[50%] p-3 rounded-md shadow-md text-white google" }, "Google"),
            React.createElement(facebook_login_render_props_1.default, { appId: "950003889525144", autoLoad: false, callback: responseFacebook, field: "name,picture", scope: "public_profile", render: function (renderProps) { return (React.createElement("button", { onClick: renderProps.onClick, className: "w-[50%] my-10 p-3 rounded-md shadow-md text-white facebook" }, "Facebook")); } }),
            React.createElement(react_github_login_1.default, { clientId: "Iv1.e582d78f4ad106be", onSuccess: onSuccess, onFailure: onFailure, redirectUri: "http://localhost:5173", buttonText: "Github", className: "w-[50%] p-3 rounded-md shadow-md text-white github" }))));
};
exports.default = Signin;
