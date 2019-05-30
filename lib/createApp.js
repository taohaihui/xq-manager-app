"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var history_1 = require("./history");
var router_1 = require("./router");
var menuRoot_1 = require("./menuRoot");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        var _this = this;
        return (React.createElement(react_router_dom_1.Router, { history: history_1.default },
            React.createElement(react_router_dom_1.Switch, null,
                router_1.otherRouter.map(function (item) {
                    return (React.createElement(react_router_dom_1.Route, { exact: true, key: item.path, path: item.path, render: function (props) {
                            var C = item.component;
                            return (React.createElement(C, __assign({}, props)));
                        } }));
                }),
                router_1.menuRouter.map(function (item) {
                    return (React.createElement(react_router_dom_1.Route, { exact: true, key: item.path, path: item.path, render: function (props) {
                            var C = item.component;
                            return (React.createElement(menuRoot_1.default, __assign({}, _this.props, props, { menu: router_1.appConfig.menu, openKeys: [item.parent], selectedKeys: [item.path] }),
                                React.createElement(C, __assign({}, props))));
                        } }));
                }),
                React.createElement(react_router_dom_1.Route, { render: function (props) {
                        var Error = router_1.errRouter[0].component;
                        return (React.createElement(Error, null));
                    } }))));
    };
    return App;
}(React.Component));
exports.default = App;
