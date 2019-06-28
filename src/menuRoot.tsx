import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';
import PerfectScrollbar from 'perfect-scrollbar';
import history from './history';

// import 'antd/lib/layout/style/index.css';
// import 'antd/lib/menu/style/index.css';
// import 'antd/lib/icon/style/index.css';
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
  logo?: (collapsed: boolean) => JSX.Element,
  header?: JSX.Element
}

interface State {
  openKeys: string[],
  selectedKeys: string[],
  collapsed: boolean
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
      // collapsed: false
      collapsed: this.props.collapsed
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
        <Sider
          className="layout-sider-xq"
          style={{ background: 'none' }}
          collapsed={this.state.collapsed}
          onCollapse={this.handelToggle.bind(this)}>
          <Header
            className="layout-logo-xq"
            style={{ padding: 0, overflow: 'hidden', textAlign: 'center' }}>
            {this.props.logo && this.props.logo(this.state.collapsed)}
          </Header>
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
            style={{ paddingLeft: 0 }}>
            <div style={{ display: 'inline-block', width: 30, verticalAlign: 'top' }}>
              <Icon
                className="trigger-xq"
                style={{ fontSize: 20, color: '#fff', cursor: 'pointer' }}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.handelToggle.bind(this)} />
            </div>
            <div style={{ display: 'inline-block', width: 'calc(100% - 30px)', height: '100%', overflow: 'hidden' }}>
              {this.props.header}
            </div>
          </Header>
          <div
            id="layout-content-xq"
            className="layout-content-xq"
            style={{ position: 'relative', padding: 10, background: '#ddd', height: 'calc(100% - 64px)' }}>
            {
              this.props.children
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

  handelToggle() {
    this.props.setCollapsed(!this.state.collapsed); //设置导航栏是否展开
    this.setState({
      collapsed: !this.state.collapsed,
      openKeys: !this.state.collapsed ? [] : this.props.openKeys
    });
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