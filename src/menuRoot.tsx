import * as React from 'react';
import { Menu, Icon, Breadcrumb, Tabs } from 'antd';
import PerfectScrollbar from 'perfect-scrollbar';
import { historyBrowser, historyHash } from './history';

import 'antd/dist/antd.css';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

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
  breadcrumb: { path: string, name: string, closable: boolean }[],
  activekey: string,
  setBreadcrumb: ([], string?) => void,
  setAuthInfo: (authInfo: []) => void,
  historyType: string,
  navType?: string,
  logo?: (collapsed: boolean) => JSX.Element,
  headerHeight?: number,
  headerComponent?: JSX.Element,
  children?: any
}

interface State {
  openKeys: string[],
  selectedKeys: string[],
  collapsed: boolean,
  siderWidth: number
}

export default class MenuRoot extends React.Component<Props> {
  state: State
  pathData: { path: string, name: string }[]
  menuScroll: PerfectScrollbar
  contentScroll: PerfectScrollbar
  history: any

  constructor(props) {
    super(props);

    this.state = {
      openKeys: this.props.openKeys,
      selectedKeys: this.props.selectedKeys,
      collapsed: this.props.collapsed, // 侧边栏的收缩状态
      siderWidth: this.props.collapsed ? 80 : 200
    };

    this.pathData = []; //存储所有可跳转路径
    this.history = this.props.historyType === 'hash' ? historyHash : historyBrowser;
  }

  componentDidMount() {
    try {
      this.menuScroll = new PerfectScrollbar(document.getElementById('menu-scroll-xq'));
      this.contentScroll = new PerfectScrollbar(document.getElementById('layout-content-xq'));
    } catch (err) {
      // IE9不支持 PerfectScrollbar
    }

    window.onresize = () => {
      try {
        this.menuScroll.update();
        this.contentScroll.update();
      } catch (err) {
        // IE9不支持 PerfectScrollbar
      }
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
    this.pathData = []; //每次重新渲染前清空path数据

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
              position: 'relative'
            }}>
            {/* 控制导航栏收缩 */}
            <div
              className="collapsed-btn-xq"
              style={{
                width: 30,
                position: 'absolute',
                left: 0,
                top: 0,
                textAlign: 'center',
                lineHeight: `${this.props.headerHeight}px`,
                // verticalAlign: 'top'
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
              width: '100%',
              height: '100%',
              paddingLeft: 30,
              overflow: 'hidden'
            }}>
              {this.props.headerComponent}
            </div>
          </div>

          {/* 页面主体内容 */}
          <div
            className="layout-content-xq"
            style={{
              width: '100%',
              height: `calc(100% - ${this.props.headerHeight}px)`,
              padding: 10,
              background: '#eee',
              overflow: 'hidden'
            }}>
            {/* 面包屑 */}
            <div
              style={{ height: 40 }}
              className="breadcrumb-xq">
              {
                this.props.navType === 'tab' && this.renderTabs()
              }
              {
                this.props.navType === 'breadcrumb' && this.renderBreadcrumb()
              }
            </div>

            {/* 注入设置面包屑的接口 */}
            <div
              id="layout-content-xq"
              style={{
                width: '100%',
                height: 'calc(100% - 40px)',
                background: '#fff',
                position: 'relative',
                overflow: 'auto'
              }}>
              <div style={{ minWidth: 1180 }}>
                {
                  React.cloneElement(
                    this.props.children,
                    {
                      setBreadcrumb: this.setBreadcrumb.bind(this),
                      deleteBreadcrumb: this.deleteBreadcrumb.bind(this),
                    }
                  )
                }
              </div>
            </div>
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
    this.history.push(params.key);

    let breadcrumb = [];
    this.pathData.forEach(item => {
      if (item.path === params.key) {
        breadcrumb.push({ ...item });
      }
    });

    this.setBreadcrumb(breadcrumb);
  }

  // 删除面包屑参数
  deleteBreadcrumb(deleteKeys = []) {
    if (this.props.navType === 'tab') {
      let nextBreadcrumb = [];

      deleteKeys.forEach(path => {
        this.props.breadcrumb.forEach(item => {
          if (item.path !== path) {
            nextBreadcrumb.push(item);
          }
        });
      });

      this.props.setBreadcrumb(nextBreadcrumb);
    }
  }

  // 设置面包屑参数
  setBreadcrumb(breadcrumb) {
    let nextBreadcrumb = breadcrumb;
    let activekey = '';

    if (this.props.navType === 'tab') {
      nextBreadcrumb = this.filterBreadcrumb(breadcrumb);
      activekey = breadcrumb[breadcrumb.length - 1].path;
    }
    // if (this.props.navType === 'breadcrumb') {
    //   this.setState({ nextBreadcrumb });
    // }

    this.props.setBreadcrumb(nextBreadcrumb, activekey);
  }

  // 处理面包屑参数
  filterBreadcrumb(breadcrumb) {
    let nextBreadcrumb = [...this.props.breadcrumb];

    breadcrumb.forEach(item => {
      let isHave = false;

      this.props.breadcrumb.forEach(item2 => {
        if (item.path === item2.path) {
          isHave = true; //已经有存在的tab
        }
      });

      if (!isHave) {
        nextBreadcrumb.push(item);
      }
    });

    return nextBreadcrumb;
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

  // 渲染tab式的面包屑
  renderTabs() {
    return (
      <Tabs
        hideAdd
        activeKey={this.props.activekey}
        tabBarStyle={{
          margin: 0
        }}
        type="editable-card"
        onTabClick={this.handleTabs.bind(this)}
        onEdit={this.handleDelete.bind(this)}>
        {
          this.props.breadcrumb.map(item => {
            return (
              <Tabs.TabPane
                closable={true && item.closable}
                tab={item.name}
                key={item.path} />
            );
          })
        }
      </Tabs>
    );
  }

  // 渲染面包屑
  renderBreadcrumb() {
    if (this.props.breadcrumb.length === 0) {
      return null;
    }

    let len = this.props.breadcrumb.length;
    return (
      <Breadcrumb>
        {
          this.props.breadcrumb.map((item, index) => {
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

  // tab跳转
  handleTabs(path) {
    this.history.push(path);
    this.props.setBreadcrumb(this.props.breadcrumb, path);
  }

  // 删除tab
  handleDelete(key) {
    let nextBreadcrumb = [];
    let activeKey = '';

    // 至少两个tab才能删除一个
    if (this.props.breadcrumb.length <= 1) {
      return;
    }

    this.props.breadcrumb.forEach((item, index) => {
      if (item.path !== key) {
        nextBreadcrumb.push({ ...item });
      }

      if (item.path === key && nextBreadcrumb.length > 0) {
        activeKey = nextBreadcrumb[nextBreadcrumb.length - 1].path;
      }

      if (item.path === key && nextBreadcrumb.length === 0) {
        activeKey = this.props.breadcrumb[index + 1].path;
      }
    });

    if (key !== this.props.activekey) {
      activeKey = this.props.activekey;
    }

    this.history.push(activeKey);
    this.props.setBreadcrumb(nextBreadcrumb, activeKey);
  }

  // 面包屑跳转
  handleBreadcrumb(path, e) {
    e.preventDefault();

    this.history.push(path);
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

      this.pathData.push({
        path: item.key,
        name: item.title
      });

      return (
        <Menu.Item key={item.key}>
          {item.icon && <Icon type={item.icon} />}
          <span>{item.title}</span>
        </Menu.Item>
      );
    });

    return router;
  }
}
