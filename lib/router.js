
import SystemList from 'E:/thh/my-react-staging-16.8.6/src/view/system/list';
import SystemManger from 'E:/thh/my-react-staging-16.8.6/src/view/system/manger';
import OrganizationList from 'E:/thh/my-react-staging-16.8.6/src/view/organization/list';
import OrganizationManger from 'E:/thh/my-react-staging-16.8.6/src/view/organization/manger';
import OrganizationUser from 'E:/thh/my-react-staging-16.8.6/src/view/organization/user';
import AuthorizationList from 'E:/thh/my-react-staging-16.8.6/src/view/authorization/list';
import ConfigurationList from 'E:/thh/my-react-staging-16.8.6/src/view/configuration/list';
import AdministratorList from 'E:/thh/my-react-staging-16.8.6/src/view/administrator/list';
import UserList from 'E:/thh/my-react-staging-16.8.6/src/view/user/list';
import RoleList from 'E:/thh/my-react-staging-16.8.6/src/view/role/list';
import LogList from 'E:/thh/my-react-staging-16.8.6/src/view/log/list';
  
import Login from 'E:/thh/my-react-staging-16.8.6/src/view/login';
import Other from 'E:/thh/my-react-staging-16.8.6/src/view/other';
  
import ErrorPage from 'E:/thh/my-react-staging-16.8.6/src/view/404';

const appConfig = {
  "404": true,
  "menu": [
    {
      "key": "/system",
      "title": "系统管理",
      "icon": "form",
      "subMenu": [
        {
          "key": "/system/list",
          "title": "列表管理"
        },
        {
          "key": "/system/manger",
          "title": "列表管理"
        }
      ]
    },
    {
      "key": "/organization",
      "title": "机构管理",
      "icon": "form",
      "subMenu": [
        {
          "key": "/organization/list",
          "title": "列表管理"
        },
        {
          "key": "/organization/manger",
          "title": "机构管理"
        },
        {
          "key": "/organization/user",
          "title": "机构人员",
          "hidden": true
        }
      ]
    },
    {
      "key": "/authorization/list",
      "title": "机构权限管理",
      "icon": "form"
    },
    {
      "key": "/configuration/list",
      "title": "机构配置项管理",
      "icon": "form"
    },
    {
      "key": "/administrator/list",
      "title": "机构管理员管理",
      "icon": "form"
    },
    {
      "key": "/user/list",
      "title": "用户管理",
      "icon": "form"
    },
    {
      "key": "/role/list",
      "title": "角色管理",
      "icon": "form"
    },
    {
      "key": "/log/list",
      "title": "同步日志",
      "icon": "form"
    }
  ],
  "other": [
    {
      "key": "/login",
      "title": "登录页"
    },
    {
      "key": "/other",
      "title": "其它页面"
    }
  ]
};
const menuRouter = [
  {
        path: '/system/list',
        component: SystemList,
        parent: '/system',
        title: '列表管理'
      },{
        path: '/system/manger',
        component: SystemManger,
        parent: '/system',
        title: '列表管理'
      },{
        path: '/organization/list',
        component: OrganizationList,
        parent: '/organization',
        title: '列表管理'
      },{
        path: '/organization/manger',
        component: OrganizationManger,
        parent: '/organization',
        title: '机构管理'
      },{
        path: '/organization/user',
        component: OrganizationUser,
        parent: '/organization',
        title: '机构人员'
      },{
        path: '/authorization/list',
        component: AuthorizationList,
        parent: '',
        title: '机构权限管理'
      },{
        path: '/configuration/list',
        component: ConfigurationList,
        parent: '',
        title: '机构配置项管理'
      },{
        path: '/administrator/list',
        component: AdministratorList,
        parent: '',
        title: '机构管理员管理'
      },{
        path: '/user/list',
        component: UserList,
        parent: '',
        title: '用户管理'
      },{
        path: '/role/list',
        component: RoleList,
        parent: '',
        title: '角色管理'
      },{
        path: '/log/list',
        component: LogList,
        parent: '',
        title: '同步日志'
      }
  ];

const otherRouter = [
  {
        path: '/login',
        component: Login,
        title: '登录页'
      },{
        path: '/other',
        component: Other,
        title: '其它页面'
      }
];

const errRouter = [
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
