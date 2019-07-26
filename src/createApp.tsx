import * as React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from './history';
import { menuRouter, otherRouter, errRouter, appConfig } from './router';
import MenuRoot from './menuRoot';

interface Props {
  logo?: (collapsed: boolean) => JSX.Element,
  headerHeight?: number,
  headerComponent?: JSX.Element,
  logout?: () => void
}
interface State {
  authInfo: any[],
  collapsed: boolean
}

export default class App extends React.Component<Props> {
  state: State
  static defaultProps = {
    headerHeight: 64
  }

  constructor(props) {
    super(props);

    this.state = {
      authInfo: [], // 当前应用的权限信息
      collapsed: false
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

  componentDidMount() {
    this.getAuthInfo();
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
                          collapsed={this.state.collapsed}
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