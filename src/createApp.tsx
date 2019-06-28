import * as React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from './history';
import { menuRouter, otherRouter, errRouter, appConfig } from './router';
import MenuRoot from './menuRoot';

interface Props {
  logo?: (collapsed: boolean) => JSX.Element,
  header?: JSX.Element
}
interface State {
  authInfo: any[],
  collapsed: boolean
}

export default class App extends React.Component<Props> {
  state: State

  constructor(props) {
    super(props);

    this.state = {
      authInfo: [], // 当前应用的权限信息
      collapsed: false
    };
  };

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
                    props => {
                      const C = item.component;

                      return (
                        <C {...props} setAuthInfo={this.setAuthInfo.bind(this)} />
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
                    props => {
                      const C = item.component;

                      return (
                        <MenuRoot
                          {...this.props}
                          {...props}
                          collapsed={this.state.collapsed}
                          setCollapsed={this.setCollapsed.bind(this)}
                          getAuth={this.getAuth.bind(this)}
                          menu={appConfig.menu}
                          openKeys={[item.parent]}
                          selectedKeys={[item.path]}>
                          <C {...props} setAuthInfo={this.setAuthInfo.bind(this)} />
                        </MenuRoot>
                      );
                    }
                  } />
              );
            })
          }
          <Route
            render={
              props => {
                let Error = errRouter[0].component;
                return (
                  <Error {...props} />
                );
              }
            } />
        </Switch>
      </Router>
    );
  }

  // 开放给页面设置权限信息的接口
  setAuthInfo(authInfo) {
    this.setState({ authInfo });
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