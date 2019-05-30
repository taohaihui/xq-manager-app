import * as React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from './history';
import { menuRouter, otherRouter, errRouter, appConfig } from './router';
import MenuRoot from './menuRoot';

interface Props{
  logo?: JSX.Element,
  header?: JSX.Element
}

export default class App extends React.Component<Props> {
  render() {
    return (
      <Router history={history}>
        <Switch>
          {
            otherRouter.map(item => {
              return (
                <Route
                  exact
                  key={item.path}
                  path={item.path}
                  render={
                    props => {
                      const C = item.component;

                      return (
                        <C {...props} />
                      );
                    }
                  } />
              );
            })
          }
          {
            menuRouter.map(item => {
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
                          menu={appConfig.menu}
                          openKeys={[item.parent]}
                          selectedKeys={[item.path]}>
                          <C {...props} />
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
                  <Error />
                );
              }
            } />
        </Switch>
      </Router>
    );
  }
}