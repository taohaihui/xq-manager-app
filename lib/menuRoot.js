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
// import 'antd/lib/layout/style/index.css';
// import 'antd/lib/menu/style/index.css';
// import 'antd/lib/icon/style/index.css';
require("antd/dist/antd.css");
require("perfect-scrollbar/css/perfect-scrollbar.css");
var Header = antd_1.Layout.Header, Sider = antd_1.Layout.Sider, Content = antd_1.Layout.Content;
var MenuRoot = /** @class */ (function (_super) {
    __extends(MenuRoot, _super);
    function MenuRoot(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            openKeys: _this.props.openKeys,
            selectedKeys: _this.props.selectedKeys,
            collapsed: _this.props.location.state || false
        };
        return _this;
    }
    MenuRoot.prototype.componentDidMount = function () {
        this.menuScroll = new perfect_scrollbar_1.default(document.getElementById('menu-scroll-xq'));
        this.contentScroll = new perfect_scrollbar_1.default(document.getElementById('layout-content-xq'));
    };
    MenuRoot.prototype.componentDidUpdate = function () {
        this.menuScroll.update();
        this.contentScroll.update();
    };
    MenuRoot.prototype.componentWillUnmount = function () {
        this.menuScroll.destroy();
        this.contentScroll.destroy();
    };
    MenuRoot.prototype.render = function () {
        return (React.createElement(antd_1.Layout, { className: "layout-wrap-xq", style: { height: '100%' } },
            React.createElement(Sider, { className: "layout-sider-xq", style: { background: 'none' }, 
                // collapsible
                collapsed: this.state.collapsed, onCollapse: this.handelToggle.bind(this) },
                React.createElement(Header, { className: "layout-logo-xq", style: { padding: 0 } }, this.props.logo),
                React.createElement("div", { id: "menu-scroll-xq", style: { height: 'calc(100% - 64px)', position: 'relative' } },
                    React.createElement(antd_1.Menu, { className: "sider-menu-xq", mode: "inline", theme: "dark", inlineCollapsed: this.state.collapsed, style: { minHeight: '100%' }, openKeys: this.state.openKeys, selectedKeys: this.state.selectedKeys, onOpenChange: this.handleOpen.bind(this), onSelect: this.handleMenu.bind(this) }, this.renderMenu(this.props.menu)))),
            React.createElement(antd_1.Layout, null,
                React.createElement(Header, { className: "layout-header-xq", style: { paddingLeft: 0 } },
                    React.createElement("div", { style: { display: 'inline-block', width: 30 } },
                        React.createElement(antd_1.Icon, { className: "trigger-xq", style: { fontSize: 24, lineHeight: '64px', color: '#fff', cursor: 'pointer' }, type: this.state.collapsed ? 'menu-unfold' : 'menu-fold', onClick: this.handelToggle.bind(this) })),
                    React.createElement("div", { style: { display: 'inline-block', width: 'calc(100% - 30px)', height: '100%' } }, this.props.header)),
                React.createElement(Content, { id: "layout-content-xq", className: "layout-content-xq", style: { position: 'relative', padding: 10, background: '#ddd' } }, this.props.children))));
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
        history_1.default.push(params.key, this.state.collapsed);
    };
    MenuRoot.prototype.handelToggle = function () {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    // 渲染导航列表
    MenuRoot.prototype.renderMenu = function (menu) {
        var _this = this;
        var router = [];
        router = menu.map(function (item) {
            if (item.subMenu) {
                return (React.createElement(antd_1.Menu.SubMenu, { key: item.key, title: React.createElement("span", null,
                        item.icon && React.createElement(antd_1.Icon, { type: item.icon }),
                        React.createElement("span", null, item.title)) }, _this.renderMenu(item.subMenu)));
            }
            if (item.hidden) {
                return null;
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
