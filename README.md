# 导出一个根组件，根据app.config.json配置文件生成路由

## 使用说明
### 1、安装
```node
yarn add xq-manager-app
```
or
```node
npm install xq-manager-app --dev
```

### 2、配置 app.config.json （该文件必须在src目录下）
* app.config.json配置模板
  ```json
  {
    "menu": [{
        "key": "/a",
        "title": "模块A",
        "icon": "form",
        "subMenu": [{
            "key": "/a/a",
            "title": "子模块a"
          },
          {
            "key": "/a/b",
            "title": "子模块b"
          }
        ]
      },
      {
        "key": "/b",
        "title": "模块B",
        "icon": "form",
        "subMenu": [{
            "key": "/b/a",
            "title": "子模块a"
          },
          {
            "key": "/b/b",
            "title": "子模块b"
          }, {
            "key": "/b/c",
            "title": "子模块c-不会显示在menu菜单中",
            "hidden": true
          }
        ]
      },
      {
        "key": "/c",
        "title": "模块C",
        "icon": "form"
      }
    ],
    "other": [{
        "key": "/i",
        "title": "全局模块I"
      },
      {
        "key": "/j",
        "title": "全局模块J"
      }
    ],
    "404": true
  }
  ```
* 字段解释
  * menu 此字段配置的页面将在左侧导航栏中显示
  * other 此字段配置的页面将在全局显示
  * 404 路由匹配失败后将显示404页面
  * key 文件夹生成路径和导航路径
  * title 描述信息
  * icon antd中的icon字体图标
  * subMenu 嵌套的导航
  * hidden 为true时该页面不会在导航栏中显示


### 2、使用
* 在项目根目录下运行以下命令创建 app.config.json 配置的页面和路由信息
   ```node
  yarn run create
  ```
  or

  ```node
  npm run create
  ```
* App 组件的用法
  ```js
  import React from 'react';
  import ReactDOM from 'react-dom';
  import { App } from 'xq-manager-app';

  ReactDOM.render(
    <App
      header={<h1>自定义 header</h1>}
      logo={<Button type="primary">自定义logo</Button>} />,
    document.getElementById('root')
  );
  ```
* App 组件props说明
  * header 自定义header部分
  * logo 自定义logo部分

### 3、路由跳转
* 使用props的history
  ```js
  // 只能从配置页面的props中获得
  this.props.history.push(path, state);
  ```
* 使用导出的history
  ```js
  import { history } from 'xq-manager-app';

  // 任意地方可以使用
  history.push(path, state);
  ```

