
import AA from 'E:/XiaoQiProject/test-xq-manager-app/src/view/a/a/AA.jsx';
import AB from 'E:/XiaoQiProject/test-xq-manager-app/src/view/a/b/AB.jsx';
import BA from 'E:/XiaoQiProject/test-xq-manager-app/src/view/b/a/BA.jsx';
import BB from 'E:/XiaoQiProject/test-xq-manager-app/src/view/b/b/BB.jsx';
import BC from 'E:/XiaoQiProject/test-xq-manager-app/src/view/b/c/BC.jsx';
import C from 'E:/XiaoQiProject/test-xq-manager-app/src/view/c/C.jsx';
import D from 'E:/XiaoQiProject/test-xq-manager-app/src/view/d/D.jsx';
import E from 'E:/XiaoQiProject/test-xq-manager-app/src/view/e/E.jsx';
import F from 'E:/XiaoQiProject/test-xq-manager-app/src/view/f/F.jsx';
import G from 'E:/XiaoQiProject/test-xq-manager-app/src/view/g/G.jsx';
import H from 'E:/XiaoQiProject/test-xq-manager-app/src/view/h/H.jsx';
  
import Login from 'E:/XiaoQiProject/test-xq-manager-app/src/view/login/Login.jsx';
import J from 'E:/XiaoQiProject/test-xq-manager-app/src/view/j/J.jsx';
  
import ErrorPage from 'E:/XiaoQiProject/test-xq-manager-app/src/view/404/ErrorPage.jsx';

var appConfig = {
  "404": true,
  "menu": [
    {
      "key": "/a",
      "auth": "/a",
      "title": "模块A",
      "icon": "form",
      "subMenu": [
        {
          "key": "/a/a",
          "auth": "/a/a",
          "title": "子模块a"
        },
        {
          "key": "/a/b",
          "auth": "/a/b",
          "title": "子模块b"
        }
      ]
    },
    {
      "key": "/b",
      "title": "模块B",
      "icon": "form",
      "subMenu": [
        {
          "key": "/b/a",
          "auth": "/b/a",
          "title": "子模块a"
        },
        {
          "key": "/b/b",
          "title": "子模块b"
        },
        {
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
    },
    {
      "key": "/d",
      "title": "模块D",
      "icon": "form"
    },
    {
      "key": "/e",
      "title": "模块E",
      "icon": "form"
    },
    {
      "key": "/f",
      "title": "模块F",
      "icon": "form"
    },
    {
      "key": "/g",
      "title": "模块G",
      "icon": "form"
    },
    {
      "key": "/h",
      "title": "模块H",
      "icon": "form"
    }
  ],
  "other": [
    {
      "key": "/login",
      "title": "登录页"
    },
    {
      "key": "/j",
      "title": "全局模块J"
    }
  ]
};
var menuRouter = [
  {
        path: '/a/a',
        auth: '/a/a',
        component: AA,
        parent: '/a',
        title: '子模块a'
      },{
        path: '/a/b',
        auth: '/a/b',
        component: AB,
        parent: '/a',
        title: '子模块b'
      },{
        path: '/b/a',
        auth: '/b/a',
        component: BA,
        parent: '/b',
        title: '子模块a'
      },{
        path: '/b/b',
        auth: '',
        component: BB,
        parent: '/b',
        title: '子模块b'
      },{
        path: '/b/c',
        auth: '',
        component: BC,
        parent: '/b',
        title: '子模块c-不会显示在menu菜单中'
      },{
        path: '/c',
        auth: '',
        component: C,
        parent: '',
        title: '模块C'
      },{
        path: '/d',
        auth: '',
        component: D,
        parent: '',
        title: '模块D'
      },{
        path: '/e',
        auth: '',
        component: E,
        parent: '',
        title: '模块E'
      },{
        path: '/f',
        auth: '',
        component: F,
        parent: '',
        title: '模块F'
      },{
        path: '/g',
        auth: '',
        component: G,
        parent: '',
        title: '模块G'
      },{
        path: '/h',
        auth: '',
        component: H,
        parent: '',
        title: '模块H'
      }
  ];

var otherRouter = [
  {
        path: '/login',
        auth: '',
        component: Login,
        title: '登录页'
      },{
        path: '/j',
        auth: '',
        component: J,
        title: '全局模块J'
      }
];

var errRouter = [
  {
        path: '/404',
        component: ErrorPage,
        title: '错误页面'
      }
];

export {
  menuRouter,
  otherRouter,
  errRouter,
  appConfig
};
