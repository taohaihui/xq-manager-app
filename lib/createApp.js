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
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            authInfo: [],
            collapsed: false,
            breadcrumb: _this.props.navType === 'tab' ? App.getSession('breadcrumb') || [] : [],
            tabActiveKey: App.getSession('tabActiveKey') || '' //活动标签
        };
        return _this;
    }
    ;
    App.setSession = function (name, value) {
        if (typeof sessionStorage === 'object') {
            var data = value;
            if (typeof value !== 'string') {
                if (data === undefined) {
                    data = null;
                }
                else {
                    data = JSON.stringify(data);
                }
            }
            sessionStorage.setItem(name, data);
        }
    };
    App.getSession = function (name) {
        if (typeof sessionStorage === 'object') {
            var data = sessionStorage.getItem(name);
            try {
                return JSON.parse(data);
            }
            catch (e) {
                return data;
            }
        }
        return null;
    };
    App.clear = function () {
        if (typeof sessionStorage === 'object') {
            sessionStorage.clear();
        }
        if (typeof localStorage === 'object') {
            localStorage.clear();
        }
    };
    App.prototype.componentDidMount = function () {
        this.getAuthInfo();
        this.getBreadcrumb();
    };
    App.prototype.render = function () {
        var _this = this;
        var history = this.props.historyType === 'hash' ? history_1.historyHash : history_1.historyBrowser;
        return (React.createElement(react_router_dom_1.Router, { history: history },
            React.createElement(react_router_dom_1.Switch, null,
                router_1.otherRouter.map(function (item) {
                    var isAuth = _this.getAuth(item.auth);
                    if (!isAuth) {
                        return null;
                    }
                    return (React.createElement(react_router_dom_1.Route, { exact: true, key: item.path, path: item.path, render: function (routeProps) {
                            var C = item.component;
                            return (React.createElement(C, __assign({}, routeProps, { setAuthInfo: _this.setAuthInfo.bind(_this) })));
                        } }));
                }),
                router_1.menuRouter.map(function (item) {
                    var isAuth = _this.getAuth(item.auth);
                    if (!isAuth) {
                        return null;
                    }
                    return (React.createElement(react_router_dom_1.Route, { exact: true, key: item.path, path: item.path, render: function (routeProps) {
                            var C = item.component; //页面
                            return (React.createElement(menuRoot_1.default, __assign({}, _this.props, routeProps, { breadcrumb: _this.state.breadcrumb, collapsed: _this.state.collapsed, setBreadcrumb: _this.setBreadcrumb.bind(_this), activekey: _this.state.tabActiveKey, setCollapsed: _this.setCollapsed.bind(_this), setAuthInfo: _this.setAuthInfo.bind(_this), getAuth: _this.getAuth.bind(_this), menu: router_1.appConfig.menu, openKeys: [item.parent], selectedKeys: [item.path] }),
                                React.createElement(C, __assign({}, routeProps, { setAuthInfo: _this.setAuthInfo.bind(_this) }))));
                        } }));
                }),
                React.createElement(react_router_dom_1.Route, { render: function (routeProps) {
                        var Error = router_1.errRouter[0].component;
                        return (React.createElement(Error, __assign({}, routeProps)));
                    } }))));
    };
    // 从缓存获取权限信息
    App.prototype.getAuthInfo = function () {
        var authInfo = App.getSession('authInfo-from-user');
        if (authInfo) {
            this.setState({ authInfo: authInfo });
        }
    };
    // 开放给页面设置权限信息的接口
    App.prototype.setAuthInfo = function (authInfo) {
        this.setState({ authInfo: authInfo });
        App.setSession('authInfo-from-user', authInfo); //缓存权限信息
    };
    // 从缓存获取tab形式的面包屑数据
    App.prototype.getBreadcrumb = function () {
        if (this.props.navType === 'tab') {
            var breadcrumb = App.getSession('breadcrumb');
            var tabActiveKey = App.getSession('tabActiveKey');
            if (breadcrumb && tabActiveKey) {
                this.setState({
                    breadcrumb: breadcrumb,
                    tabActiveKey: tabActiveKey
                });
            }
        }
    };
    // 设置面包屑数据
    App.prototype.setBreadcrumb = function (nextBreadcrumb, tabActiveKey) {
        if (this.props.navType === 'tab' && nextBreadcrumb.length > this.props.tabNum) {
            var index = 0;
            for (var i = 0; i < nextBreadcrumb.length; i++) {
                if (nextBreadcrumb[i].closable !== false) {
                    index = i;
                    break;
                }
            }
            nextBreadcrumb.splice(index, nextBreadcrumb.length - this.props.tabNum);
        }
        if (!tabActiveKey) {
            this.setState({
                breadcrumb: nextBreadcrumb
            });
        }
        else {
            this.setState({
                breadcrumb: nextBreadcrumb,
                tabActiveKey: tabActiveKey
            });
        }
        if (this.props.navType === 'tab' && tabActiveKey) {
            App.setSession('breadcrumb', nextBreadcrumb); //缓存tab形式的面包屑
            App.setSession('tabActiveKey', tabActiveKey); //缓存tab key
        }
        else {
            App.setSession('breadcrumb', nextBreadcrumb); //缓存tab形式的面包屑
        }
    };
    // 设置导航栏是否展开,切换导航后保持一致
    App.prototype.setCollapsed = function (bool) {
        this.setState({ collapsed: bool });
    };
    // 权限验证
    App.prototype.getAuth = function (auth) {
        var authInfo = this.state.authInfo || [];
        var bool = false;
        // 没有配置权限信息，不进行权限管理,所有用户都能访问
        if (!auth) {
            bool = true;
        }
        for (var i = 0; i < authInfo.length; i++) {
            // 权限匹配成功
            if (auth === authInfo[i].auth) {
                bool = true;
                break;
            }
        }
        return bool;
    };
    App.defaultProps = {
        headerHeight: 64,
        navType: 'breadcrumb',
        tabNum: 10,
        historyType: 'browser' // browser | hash
    };
    return App;
}(React.Component));
exports.default = App;
