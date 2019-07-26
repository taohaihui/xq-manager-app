import * as React from 'react';
import { Layout, Menu, Icon, Tooltip, Breadcrumb } from 'antd';
import PerfectScrollbar from 'perfect-scrollbar';
import history from './history';

import 'antd/dist/antd.css';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

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
  headerHeight?: number,
  headerComponent?: JSX.Element,
  children?: any
}

interface State {
  openKeys: string[],
  selectedKeys: string[],
  collapsed: boolean,
  breadcrumb: any[],
  siderWidth: number
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
      breadcrumb: [], // 面包屑
      siderWidth: 200
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
      <div
        className="layout-wrap-xq"
        style={{
          width: '100%',
          height: '100%',
        }}>
        <div
          className="layout-sider-xq"
          style={{
            width: this.state.siderWidth,
            height: '100%',
            background: '#001529',
            float: 'left'
          }}>

          {/* logo */}
          <div
            className="layout-logo-xq"
            style={{
              height: this.props.headerHeight, //自定义header高度
              lineHeight: `${this.props.headerHeight}px`,
              padding: 0,
              overflow: 'hidden',
              textAlign: 'center'
            }}>
            {this.props.logo && this.props.logo(this.state.collapsed)}
          </div>

          {/* 导航栏 */}
          <div
            id="menu-scroll-xq"
            style={{
              height: `calc(100% - ${this.props.headerHeight}px)`,
              position: 'relative'
            }}>
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
        </div>

        <div style={{
          width: `calc(100% - ${this.state.siderWidth}px)`,
          height: '100%',
          float: 'left'
        }}>
          <div
            className="layout-header-xq"
            style={{
              height: this.props.headerHeight,
              padding: 0,
              background: '#001529',
            }}>
            {/* 控制导航栏收缩 */}
            <div style={{
              display: 'inline-block',
              width: 30,
              lineHeight: `${this.props.headerHeight}px`,
              verticalAlign: 'top'
            }}>
              <Icon
                className="trigger-xq"
                style={{
                  fontSize: 20,
                  color: '#fff',
                  cursor: 'pointer'
                }}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.handelToggle.bind(this)} />
            </div>

            {/* 自定义header部分 */}
            <div style={{
              display: 'inline-block',
              width: 'calc(100% - 80px)',
              height: '100%',
              overflow: 'hidden'
            }}>
              {this.props.headerComponent}
            </div>

            {/* 退出登录 */}
            <div style={{
              display: 'inline-block',
              width: 50,
              height: '100%',
              lineHeight: `${this.props.headerHeight}px`,
              overflow: 'hidden'
            }}>
              {
                this.props.logout && (
                  <Tooltip title="退出登录">
                    <Icon
                      style={{ fontSize: 20, color: '#fff', cursor: 'pointer' }}
                      type="poweroff"
                      onClick={this.handleLogOut.bind(this)} />
                  </Tooltip>
                )
              }
            </div>
          </div>

          {/* 页面主体内容 */}
          <div
            id="layout-content-xq"
            className="layout-content-xq"
            style={{
              height: `calc(100% - ${this.props.headerHeight}px)`,
              position: 'relative',
              padding: 10,
              background: '#ddd'
            }}>
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
        </div>
      </div>
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
    let nextBool = !this.state.collapsed;
    this.props.setCollapsed(nextBool); //设置导航栏是否展开
    this.setState({
      collapsed: nextBool,
      openKeys: nextBool ? [] : this.props.openKeys,
      siderWidth: nextBool ? 80 : 200
    });
  }

  handleLogOut() {
    this.props.setAuthInfo([]);

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
