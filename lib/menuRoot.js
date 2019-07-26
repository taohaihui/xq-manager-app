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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var antd_1 = require("antd");
var perfect_scrollbar_1 = require("perfect-scrollbar");
var history_1 = require("./history");
require("antd/dist/antd.css");
require("perfect-scrollbar/css/perfect-scrollbar.css");
var Header = antd_1.Layout.Header, Sider = antd_1.Layout.Sider;
var MenuRoot = /** @class */ (function (_super) {
    __extends(MenuRoot, _super);
    function MenuRoot(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            openKeys: _this.props.openKeys,
            selectedKeys: _this.props.selectedKeys,
            collapsed: _this.props.collapsed,
            breadcrumb: [],
            siderWidth: 200
        };
        return _this;
    }
    MenuRoot.prototype.componentDidMount = function () {
        try {
            this.menuScroll = new perfect_scrollbar_1.default(document.getElementById('menu-scroll-xq'));
            this.contentScroll = new perfect_scrollbar_1.default(document.getElementById('layout-content-xq'));
        }
        catch (err) {
            // IE9不支持 PerfectScrollbar
        }
    };
    MenuRoot.prototype.componentDidUpdate = function () {
        try {
            this.menuScroll.update();
            this.contentScroll.update();
        }
        catch (err) {
            // IE9不支持 PerfectScrollbar
        }
    };
    MenuRoot.prototype.componentWillUnmount = function () {
        try {
            this.menuScroll.destroy();
            this.contentScroll.destroy();
        }
        catch (err) {
            // IE9不支持 PerfectScrollbar
        }
    };
    MenuRoot.prototype.render = function () {
        return (React.createElement("div", { className: "layout-wrap-xq", style: {
                width: '100%',
                height: '100%',
            } },
            React.createElement("div", { className: "layout-sider-xq", style: {
                    width: this.state.siderWidth,
                    height: '100%',
                    background: '#001529',
                    float: 'left'
                } },
                React.createElement("div", { className: "layout-logo-xq", style: {
                        height: this.props.headerHeight,
                        lineHeight: this.props.headerHeight + "px",
                        padding: 0,
                        overflow: 'hidden',
                        textAlign: 'center'
                    } }, this.props.logo && this.props.logo(this.state.collapsed)),
                React.createElement("div", { id: "menu-scroll-xq", style: {
                        height: "calc(100% - " + this.props.headerHeight + "px)",
                        position: 'relative'
                    } },
                    React.createElement(antd_1.Menu, { className: "sider-menu-xq", mode: "inline", theme: "dark", inlineCollapsed: this.state.collapsed, style: { minHeight: '100%' }, openKeys: this.state.openKeys, selectedKeys: this.state.selectedKeys, onOpenChange: this.handleOpen.bind(this), onSelect: this.handleMenu.bind(this) }, this.renderMenu(this.props.menu)))),
            React.createElement("div", { style: {
                    width: "calc(100% - " + this.state.siderWidth + "px)",
                    height: '100%',
                    float: 'left'
                } },
                React.createElement("div", { className: "layout-header-xq", style: {
                        height: this.props.headerHeight,
                        padding: 0,
                        background: '#001529',
                    } },
                    React.createElement("div", { style: {
                            display: 'inline-block',
                            width: 30,
                            lineHeight: this.props.headerHeight + "px",
                            verticalAlign: 'top'
                        } },
                        React.createElement(antd_1.Icon, { className: "trigger-xq", style: {
                                fontSize: 20,
                                color: '#fff',
                                cursor: 'pointer'
                            }, type: this.state.collapsed ? 'menu-unfold' : 'menu-fold', onClick: this.handelToggle.bind(this) })),
                    React.createElement("div", { style: {
                            display: 'inline-block',
                            width: 'calc(100% - 80px)',
                            height: '100%',
                            overflow: 'hidden'
                        } }, this.props.headerComponent),
                    React.createElement("div", { style: {
                            display: 'inline-block',
                            width: 50,
                            height: '100%',
                            lineHeight: this.props.headerHeight + "px",
                            overflow: 'hidden'
                        } }, this.props.logout && (React.createElement(antd_1.Tooltip, { title: "\u9000\u51FA\u767B\u5F55" },
                        React.createElement(antd_1.Icon, { style: { fontSize: 20, color: '#fff', cursor: 'pointer' }, type: "poweroff", onClick: this.handleLogOut.bind(this) }))))),
                React.createElement("div", { id: "layout-content-xq", className: "layout-content-xq", style: {
                        height: "calc(100% - " + this.props.headerHeight + "px)",
                        position: 'relative',
                        padding: 10,
                        background: '#ddd'
                    } },
                    React.createElement("div", { className: "breadcrumb-xq", style: { padding: '0 0 10px 0' } }, this.state.breadcrumb.length > 0 && this.renderBreadcrumb()),
                    React.cloneElement(this.props.children, { setBreadcrumb: this.setBreadcrumb.bind(this) })))));
    };
    MenuRoot.prototype.handleOpen = function (openKeys) {
        this.setState({
            openKeys: openKeys
        });
    };
    MenuRoot.prototype.handleMenu = function (params) {
        // this.setState({
        //   selectedKeys: params.selectedKeys
        // });
        history_1.default.push(params.key);
    };
    // 设置面包屑参数
    MenuRoot.prototype.setBreadcrumb = function (breadcrumb) {
        this.setState({ breadcrumb: breadcrumb });
    };
    MenuRoot.prototype.handelToggle = function () {
        var nextBool = !this.state.collapsed;
        this.props.setCollapsed(nextBool); //设置导航栏是否展开
        this.setState({
            collapsed: nextBool,
            openKeys: nextBool ? [] : this.props.openKeys,
            siderWidth: nextBool ? 80 : 200
        });
    };
    MenuRoot.prototype.handleLogOut = function () {
        this.props.setAuthInfo([]);
        this.props.logout && this.props.logout(); //退出登录的回调函数
    };
    // 渲染面包屑
    MenuRoot.prototype.renderBreadcrumb = function () {
        var _this = this;
        var len = this.state.breadcrumb.length;
        return (React.createElement(antd_1.Breadcrumb, null, this.state.breadcrumb.map(function (item, index) {
            return (React.createElement(antd_1.Breadcrumb.Item, { key: index }, len === index + 1 || !item.path
                ? (React.createElement("span", null, item.name))
                : (React.createElement("a", { href: "", onClick: _this.handleBreadcrumb.bind(_this, item.path) }, item.name))));
        })));
    };
    // 面包屑跳转
    MenuRoot.prototype.handleBreadcrumb = function (path, e) {
        e.preventDefault();
        history_1.default.push(path);
    };
    // 渲染导航列表
    MenuRoot.prototype.renderMenu = function (menu) {
        var _this = this;
        var router = [];
        router = menu.map(function (item) {
            var isAuth = _this.props.getAuth(item.auth);
            if (item.hidden || !isAuth) {
                return null;
            }
            if (item.subMenu) {
                return (React.createElement(antd_1.Menu.SubMenu, { key: item.key, title: React.createElement("span", null,
                        item.icon && React.createElement(antd_1.Icon, { type: item.icon }),
                        React.createElement("span", null, item.title)) }, _this.renderMenu(item.subMenu)));
            }
            return (React.createElement(antd_1.Menu.Item, { key: item.key },
                item.icon && React.createElement(antd_1.Icon, { type: item.icon }),
                React.createElement("span", null, item.title)));
        });
        return router;
    };
    return MenuRoot;
}(React.Component));
exports.default = MenuRoot;
