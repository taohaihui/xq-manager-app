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
var antd_1 = require("antd");
var perfect_scrollbar_1 = require("perfect-scrollbar");
var history_1 = require("./history");
require("antd/dist/antd.css");
require("perfect-scrollbar/css/perfect-scrollbar.css");
var MenuRoot = /** @class */ (function (_super) {
    __extends(MenuRoot, _super);
    function MenuRoot(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            openKeys: _this.props.openKeys,
            selectedKeys: _this.props.selectedKeys,
            collapsed: _this.props.collapsed,
            siderWidth: _this.props.collapsed ? 80 : 200
        };
        _this.pathData = []; //存储所有可跳转路径
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
        this.pathData = []; //每次重新渲染前清空path数据
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
                        position: 'relative'
                    } },
                    React.createElement("div", { className: "collapsed-btn-xq", style: {
                            width: 30,
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            textAlign: 'center',
                            lineHeight: this.props.headerHeight + "px",
                        } },
                        React.createElement(antd_1.Icon, { className: "trigger-xq", style: {
                                fontSize: 20,
                                color: '#fff',
                                cursor: 'pointer'
                            }, type: this.state.collapsed ? 'menu-unfold' : 'menu-fold', onClick: this.handelToggle.bind(this) })),
                    React.createElement("div", { style: {
                            width: '100%',
                            height: '100%',
                            paddingLeft: 30
                        } }, this.props.headerComponent)),
                React.createElement("div", { className: "layout-content-xq", style: {
                        width: '100%',
                        height: "calc(100% - " + this.props.headerHeight + "px)",
                        padding: 10,
                        background: '#ddd',
                        overflow: 'hidden'
                    } },
                    React.createElement("div", { style: { height: 40 }, className: "breadcrumb-xq" },
                        this.props.navType === 'tab' && this.renderTabs(),
                        this.props.navType === 'breadcrumb' && this.renderBreadcrumb()),
                    React.createElement("div", { id: "layout-content-xq", style: {
                            width: '100%',
                            height: 'calc(100% - 40px)',
                            background: '#fff',
                            position: 'relative',
                            overflow: 'auto'
                        } },
                        React.createElement("div", { style: { minWidth: 1180 } }, React.cloneElement(this.props.children, {
                            setBreadcrumb: this.setBreadcrumb.bind(this)
                        })))))));
    };
    MenuRoot.prototype.handleOpen = function (openKeys) {
        this.setState({
            openKeys: openKeys
        });
    };
    MenuRoot.prototype.handleMenu = function (params) {
        history_1.default.push(params.key);
        var breadcrumb = [];
        this.pathData.forEach(function (item) {
            if (item.path === params.key) {
                breadcrumb.push(__assign({}, item));
            }
        });
        this.setBreadcrumb(breadcrumb);
    };
    // 设置面包屑参数
    MenuRoot.prototype.setBreadcrumb = function (breadcrumb) {
        var nextBreadcrumb = breadcrumb;
        var activekey = '';
        if (this.props.navType === 'tab') {
            nextBreadcrumb = this.filterBreadcrumb(breadcrumb);
            activekey = breadcrumb[breadcrumb.length - 1].path;
        }
        // if (this.props.navType === 'breadcrumb') {
        //   this.setState({ nextBreadcrumb });
        // }
        this.props.setBreadcrumb(nextBreadcrumb, activekey);
    };
    // 处理面包屑参数
    MenuRoot.prototype.filterBreadcrumb = function (breadcrumb) {
        var _this = this;
        var nextBreadcrumb = this.props.breadcrumb.slice();
        breadcrumb.forEach(function (item) {
            var isHave = false;
            _this.props.breadcrumb.forEach(function (item2) {
                if (item.path === item2.path) {
                    isHave = true; //已经有存在的tab
                }
            });
            if (!isHave) {
                nextBreadcrumb.push(item);
            }
        });
        return nextBreadcrumb;
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
    // 渲染tab式的面包屑
    MenuRoot.prototype.renderTabs = function () {
        return (React.createElement(antd_1.Tabs, { hideAdd: true, activeKey: this.props.activekey, tabBarStyle: {
                margin: 0
            }, type: "editable-card", onTabClick: this.handleTabs.bind(this), onEdit: this.handleDelete.bind(this) }, this.props.breadcrumb.map(function (item) {
            return (React.createElement(antd_1.Tabs.TabPane, { closable: true && item.closable, tab: item.name, key: item.path }));
        })));
    };
    // 渲染面包屑
    MenuRoot.prototype.renderBreadcrumb = function () {
        var _this = this;
        if (this.props.breadcrumb.length === 0) {
            return null;
        }
        var len = this.props.breadcrumb.length;
        return (React.createElement(antd_1.Breadcrumb, null, this.props.breadcrumb.map(function (item, index) {
            return (React.createElement(antd_1.Breadcrumb.Item, { key: index }, len === index + 1 || !item.path
                ? (React.createElement("span", null, item.name))
                : (React.createElement("a", { href: "", onClick: _this.handleBreadcrumb.bind(_this, item.path) }, item.name))));
        })));
    };
    // tab跳转
    MenuRoot.prototype.handleTabs = function (path) {
        history_1.default.push(path);
        this.props.setBreadcrumb(this.props.breadcrumb, path);
    };
    // 删除tab
    MenuRoot.prototype.handleDelete = function (key) {
        var _this = this;
        var nextBreadcrumb = [];
        var activeKey = '';
        // 至少两个tab才能删除一个
        if (this.props.breadcrumb.length <= 1) {
            return;
        }
        this.props.breadcrumb.forEach(function (item, index) {
            if (item.path !== key) {
                nextBreadcrumb.push(__assign({}, item));
            }
            if (item.path === key && nextBreadcrumb.length > 0) {
                activeKey = nextBreadcrumb[nextBreadcrumb.length - 1].path;
            }
            if (item.path === key && nextBreadcrumb.length === 0) {
                activeKey = _this.props.breadcrumb[index + 1].path;
            }
        });
        if (key !== this.props.activekey) {
            activeKey = this.props.activekey;
        }
        history_1.default.push(activeKey);
        this.props.setBreadcrumb(nextBreadcrumb, activeKey);
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
            _this.pathData.push({
                path: item.key,
                name: item.title
            });
            return (React.createElement(antd_1.Menu.Item, { key: item.key },
                item.icon && React.createElement(antd_1.Icon, { type: item.icon }),
                React.createElement("span", null, item.title)));
        });
        return router;
    };
    return MenuRoot;
}(React.Component));
exports.default = MenuRoot;
