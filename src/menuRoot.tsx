import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';
import PerfectScrollbar from 'perfect-scrollbar';
import history from './history';

// import 'antd/lib/layout/style/index.css';
// import 'antd/lib/menu/style/index.css';
// import 'antd/lib/icon/style/index.css';
import 'antd/dist/antd.css';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

const { Header, Sider, Content } = Layout;

interface Props {
  openKeys: string[],
  selectedKeys: string[],
  menu: any[],
  location: {
    state: boolean
  },
  logo?: JSX.Element,
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
      collapsed: this.props.location.state || false
    };
  }

  componentDidMount() {
    this.menuScroll = new PerfectScrollbar(document.getElementById('menu-scroll-xq'));
    this.contentScroll = new PerfectScrollbar(document.getElementById('layout-content-xq'));
  }

  componentDidUpdate() {
    this.menuScroll.update();
    this.contentScroll.update();
  }

  componentWillUnmount() {
    this.menuScroll.destroy();
    this.contentScroll.destroy();
  }

  render() {
    return (
      <Layout className="layout-wrap-xq" style={{ height: '100%' }}>
        <Sider
          className="layout-sider-xq"
          style={{ background: 'none' }}
          // collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.handelToggle.bind(this)}>
          <Header
            className="layout-logo-xq"
            style={{ padding: 0 }}>
            {this.props.logo}
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
            <div style={{ display: 'inline-block', width: 30 }}>
              <Icon
                className="trigger-xq"
                style={{ fontSize: 24, lineHeight: '64px', color: '#fff', cursor: 'pointer' }}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.handelToggle.bind(this)} />
            </div>
            <div style={{ display: 'inline-block', width: 'calc(100% - 30px)', height: '100%' }}>
              {this.props.header}
            </div>
          </Header>
          <Content
            id="layout-content-xq"
            className="layout-content-xq"
            style={{ position: 'relative', padding: 10, background: '#ddd' }}>
            {
              this.props.children
            }
          </Content>
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
    history.push(params.key, this.state.collapsed);
  }

  handelToggle() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  // 渲染导航列表
  renderMenu(menu: any[]): JSX.Element[] {
    let router = [];

    router = menu.map(item => {
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

      if (item.hidden) {
        return null;
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