import * as React from 'react';
import { Layout, Menu, Icon, Tooltip, Breadcrumb } from 'antd';
import PerfectScrollbar from 'perfect-scrollbar';
import history from './history';

// import 'antd/lib/layout/style/index.css';
// import 'antd/lib/menu/style/index.css';
// import 'antd/lib/icon/style/index.css';
import 'antd/dist/antd.css';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
const querystring = require('querystring');

const { Header, Sider } = Layout;

interface Props {
  openKeys: string[],
  selectedKeys: string[],
  collapsed: boolean,
  setCollapsed: (bool: boolean) => void,
  getAuth: (auth: string) => boolean,
  menu: any[],
  location: {
    state: boolean
  },
  setAuthInfo: (authInfo: []) => void,
  logo?: (collapsed: boolean) => JSX.Element,
  logout?: () => void,
  header?: JSX.Element,
  children?: any
}

interface State {
  openKeys: string[],
  selectedKeys: string[],
  collapsed: boolean,
  breadcrumb?: any[]
}
export default class MenuRoot extends React.Component<Props> {
  state: State
  menuScroll: PerfectScrollbar
  contentScroll: PerfectScrollbar

  constructor(props) {
    super(props);

    this.state = {
      openKeys: this.props.openKeys,
      selectedKeys: this.props.selectedKeys,
      collapsed: this.props.collapsed, // 侧边栏的收缩状态
      breadcrumb: [] // 面包屑
    };
  }

  componentDidMount() {
    try {
      this.menuScroll = new PerfectScrollbar(document.getElementById('menu-scroll-xq'));
      this.contentScroll = new PerfectScrollbar(document.getElementById('layout-content-xq'));
    } catch (err) {
      // IE9不支持 PerfectScrollbar
    }
  }

  componentDidUpdate() {
    try {
      this.menuScroll.update();
      this.contentScroll.update();
    } catch (err) {
      // IE9不支持 PerfectScrollbar
    }
  }

  componentWillUnmount() {
    try {
      this.menuScroll.destroy();
      this.contentScroll.destroy();
    } catch (err) {
      // IE9不支持 PerfectScrollbar
    }
  }

  render() {
    return (
      <Layout className="layout-wrap-xq" style={{ height: '100%' }}>
        {/* 左侧导航栏 */}
        <Sider
          className="layout-sider-xq"
          style={{ background: 'none' }}
          collapsed={this.state.collapsed}
          onCollapse={this.handelToggle.bind(this)}>
          {/* logo */}
          <Header
            className="layout-logo-xq"
            style={{ padding: 0, overflow: 'hidden', textAlign: 'center' }}>
            {this.props.logo && this.props.logo(this.state.collapsed)}
          </Header>

          {/* 导航菜单 */}
          <div
            id="menu-scroll-xq"
            style={{ height: 'calc(100% - 64px)', position: 'relative' }}>
            <Menu
              className="sider-menu-xq"
              mode="inline"
              theme="dark"
              inlineCollapsed={this.state.collapsed}
              style={{ minHeight: '100%' }}
              openKeys={this.state.openKeys}
              selectedKeys={this.state.selectedKeys}
              onOpenChange={this.handleOpen.bind(this)}
              onSelect={this.handleMenu.bind(this)}>
              {this.renderMenu(this.props.menu)}
            </Menu>
          </div>
        </Sider>

        <Layout>
          <Header
            className="layout-header-xq"
            style={{ padding: 0 }}>
            {/* 控制导航栏收缩 */}
            <div style={{ display: 'inline-block', width: 30, verticalAlign: 'top' }}>
              <Icon
                className="trigger-xq"
                style={{ fontSize: 20, color: '#fff', cursor: 'pointer' }}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.handelToggle.bind(this)} />
            </div>

            {/* 自定义header部分 */}
            <div style={{ display: 'inline-block', width: 'calc(100% - 80px)', height: '100%', overflow: 'hidden' }}>
              {this.props.header}
            </div>

            {/* 退出登录 */}
            <div style={{ display: 'inline-block', width: 50, height: '100%', overflow: 'hidden' }}>
              <Tooltip title="退出登录">
                <Icon
                  style={{ fontSize: 20, color: '#fff', cursor: 'pointer' }}
                  type="poweroff"
                  onClick={this.handleLogOut.bind(this)} />
              </Tooltip>
            </div>
          </Header>

          {/* 页面主体内容 */}
          <div
            id="layout-content-xq"
            className="layout-content-xq"
            style={{ position: 'relative', padding: 10, background: '#ddd', height: 'calc(100% - 64px)' }}>
            {/* 面包屑 */}
            <div
              className="breadcrumb-xq"
              style={{ padding: '0 0 10px 0' }}>
              {
                this.state.breadcrumb.length > 0 && this.renderBreadcrumb()
              }
            </div>

            {/* 注入设置面包屑的接口 */}
            {
              React.cloneElement(
                this.props.children,
                { setBreadcrumb: this.setBreadcrumb.bind(this) }
              )
            }
          </div>
        </Layout>
      </Layout>
    );
  }

  handleOpen(openKeys) {
    this.setState({
      openKeys
    });
  }

  handleMenu(params) {
    // this.setState({
    //   selectedKeys: params.selectedKeys
    // });
    history.push(params.key);
  }

  // 设置面包屑参数
  setBreadcrumb(breadcrumb) {
    this.setState({ breadcrumb });
  }

  handelToggle() {
    this.props.setCollapsed(!this.state.collapsed); //设置导航栏是否展开
    this.setState({
      collapsed: !this.state.collapsed,
      openKeys: !this.state.collapsed ? [] : this.props.openKeys
    });
  }

  handleLogOut() {
    this.props.setAuthInfo([]);
    history.push('/login');
    this.props.logout && this.props.logout(); //退出登录的回调函数
  }

  // 渲染面包屑
  renderBreadcrumb() {
    let len = this.state.breadcrumb.length;
    return (
      <Breadcrumb>
        {
          this.state.breadcrumb.map((item, index) => {
            return (
              <Breadcrumb.Item key={index}>
                {
                  len === index + 1 || !item.path
                    ? (
                      <span>{item.name}</span>
                    )
                    : (
                      <a
                        href=""
                        onClick={this.handleBreadcrumb.bind(this, item.path)}>{item.name}</a>
                    )
                }
              </Breadcrumb.Item>
            )
          })
        }
      </Breadcrumb>
    );
  }

  // 面包屑跳转
  handleBreadcrumb(path, e) {
    e.preventDefault();
    history.push(path);
  }

  // 渲染导航列表
  renderMenu(menu: any[]): JSX.Element[] {
    let router = [];

    router = menu.map(item => {
      let isAuth = this.props.getAuth(item.auth as string);

      if (item.hidden || !isAuth) {
        return null;
      }

      if (item.subMenu) {
        return (
          <Menu.SubMenu
            key={item.key}
            title={
              <span>
                {item.icon && <Icon type={item.icon} />}
                <span>{item.title}</span>
              </span>}>
            {this.renderMenu(item.subMenu)}
          </Menu.SubMenu>
        );
      }

      return (
        <Menu.Item key={item.key}>
          {item.icon && <Icon type={item.icon} />}
          <span>{item.title}</span>
        </Menu.Item>
      )
    });

    return router;
  }
}