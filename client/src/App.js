"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_spinners_1 = require("react-spinners");
var axios_1 = require("axios");
var Header_1 = require("./components/Header");
var Home_1 = require("./components/Pages/Home");
var Signin_1 = require("./components/Signin");
var App = function () {
    var _a = (0, react_1.useState)(false), user = _a[0], setUser = _a[1];
    var _b = (0, react_1.useState)(localStorage.getItem("token") || false), token = _b[0], setToken = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    (0, react_1.useEffect)(function () {
        if (token) {
            setLoading(true);
            axios_1.default.get("https://www.googleapis.com/oauth2/v1/userinfo?access_token=".concat(token), {
                headers: {
                    Authorization: "Bearer ".concat(token),
                    Accept: "application/json",
                },
            })
                .then(function (res) {
                setUser(res.data);
                setLoading(false);
            })
                .catch(function (err) {
                console.log(err);
            });
        }
        if (!token) {
            setLoading(false);
            console.log("No token");
        }
    }, [token]);
    return (<main className="mt-20">
      <Header_1.default user={user} setUser={setUser}/>
      {loading ? (<react_spinners_1.SyncLoader />) : (<section className="mt-20">
          {user ? <Home_1.default user={user}/> : <Signin_1.default setToken={setToken}/>}
        </section>)}
    </main>);
};
exports.default = App;
