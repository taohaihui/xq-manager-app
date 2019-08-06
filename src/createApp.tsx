import * as React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from './history';
import { menuRouter, otherRouter, errRouter, appConfig } from './router';
import MenuRoot from './menuRoot';

interface Props {
  logo?: (collapsed: boolean) => JSX.Element,
  headerHeight?: number,
  headerComponent?: JSX.Element,
  navType?: string,
  tabNum?: number
}
interface State {
  authInfo: any[],
  collapsed: boolean,
  breadcrumb: { path: string, name: string, closable: boolean }[],
  tabActiveKey: string
}

export default class App extends React.Component<Props> {
  state: State
  static defaultProps = {
    headerHeight: 64,
    navType: 'breadcrumb', //默认面包屑,可选tab形式
    tabNum: 10,
  }

  constructor(props) {
    super(props);

    this.state = {
      authInfo: [], // 当前应用的权限信息
      collapsed: false,
      breadcrumb: this.props.navType === 'tab' ? App.getSession('breadcrumb') || [] : [], // 面包屑
      tabActiveKey: App.getSession('tabActiveKey') || '' //活动标签
    };
  };

  static setSession(name, value) {
    if (typeof sessionStorage === 'object') {
      var data = value;
      if (typeof value !== 'string') {
        if (data === undefined) {
          data = null;
        } else {
          data = JSON.stringify(data);
        }
      }
      sessionStorage.setItem(name, data);
    }
  }

  static getSession(name) {
    if (typeof sessionStorage === 'object') {
      var data = sessionStorage.getItem(name);
      try {
        return JSON.parse(data);
      } catch (e) {
        return data;
      }
    }
    return null;
  }

  static clear() {
    if (typeof sessionStorage === 'object') {
      sessionStorage.clear();
    }
    if (typeof localStorage === 'object') {
      localStorage.clear();
    }
  }

  componentDidMount() {
    this.getAuthInfo();
    this.getBreadcrumb();
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          {/* 全局模块 */}
          {
            otherRouter.map(item => {
              let isAuth = this.getAuth(item.auth);

              if (!isAuth) {
                return null;
              }

              return (
                <Route
                  exact
                  key={item.path}
                  path={item.path}
                  render={
                    routeProps => {
                      const C = item.component;

                      return (
                        <C {...routeProps} setAuthInfo={this.setAuthInfo.bind(this)} />
                      );
                    }
                  } />
              );
            })
          }
          {/* 导航菜单下的子模块 */}
          {
            menuRouter.map(item => {
              let isAuth = this.getAuth(item.auth);

              if (!isAuth) {
                return null;
              }

              return (
                <Route
                  exact
                  key={item.path}
                  path={item.path}
                  render={
                    routeProps => {
                      const C = item.component; //页面

                      return (
                        <MenuRoot
                          {...this.props}
                          {...routeProps}
                          breadcrumb={this.state.breadcrumb}
                          collapsed={this.state.collapsed}
                          setBreadcrumb={this.setBreadcrumb.bind(this)}
                          activekey={this.state.tabActiveKey}
                          setCollapsed={this.setCollapsed.bind(this)}
                          setAuthInfo={this.setAuthInfo.bind(this)}
                          getAuth={this.getAuth.bind(this)}
                          menu={appConfig.menu}
                          openKeys={[item.parent]}
                          selectedKeys={[item.path]}>
                          <C
                            {...routeProps}
                            setAuthInfo={this.setAuthInfo.bind(this)} />
                        </MenuRoot>
                      );
                    }
                  } />
              );
            })
          }
          <Route
            render={
              routeProps => {
                let Error = errRouter[0].component;
                return (
                  <Error {...routeProps} />
                );
              }
            } />
        </Switch>
      </Router>
    );
  }

  // 从缓存获取权限信息
  getAuthInfo() {
    let authInfo = App.getSession('authInfo-from-user');

    if (authInfo) {
      this.setState({ authInfo });
    }
  }

  // 开放给页面设置权限信息的接口
  setAuthInfo(authInfo) {
    this.setState({ authInfo });
    App.setSession('authInfo-from-user', authInfo); //缓存权限信息
  }

  // 从缓存获取tab形式的面包屑数据
  getBreadcrumb() {
    if (this.props.navType === 'tab') {
      let breadcrumb = App.getSession('breadcrumb');
      let tabActiveKey = App.getSession('tabActiveKey');

      if (breadcrumb && tabActiveKey) {
        this.setState({
          breadcrumb,
          tabActiveKey
        });
      }
    }
  }

  // 设置面包屑数据
  setBreadcrumb(nextBreadcrumb, tabActiveKey) {
    if (this.props.navType === 'tab' && nextBreadcrumb.length > this.props.tabNum) {
      let index = 0;

      for (let i = 0; i < nextBreadcrumb.length; i++) {
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
    } else {
      this.setState({
        breadcrumb: nextBreadcrumb,
        tabActiveKey
      });
    }

    if (this.props.navType === 'tab' && tabActiveKey) {
      App.setSession('breadcrumb', nextBreadcrumb); //缓存tab形式的面包屑
      App.setSession('tabActiveKey', tabActiveKey); //缓存tab key
    } else {
      App.setSession('breadcrumb', nextBreadcrumb); //缓存tab形式的面包屑
    }
  }

  // 设置导航栏是否展开,切换导航后保持一致
  setCollapsed(bool) {
    this.setState({ collapsed: bool });
  }

  // 权限验证
  getAuth(auth: string): boolean {
    let authInfo = this.state.authInfo || [];
    let bool = false;

    // 没有配置权限信息，不进行权限管理,所有用户都能访问
    if (!auth) {
      bool = true;
    }

    for (let i = 0; i < authInfo.length; i++) {
      // 权限匹配成功
      if (auth === authInfo[i].auth) {
        bool = true;
        break;
      }
    }

    return bool;
  }
}