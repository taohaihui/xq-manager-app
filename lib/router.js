
import Home from 'E:/XiaoQiProject/xqloanmg/src/view/home/Home.jsx';
import SystemUser from 'E:/XiaoQiProject/xqloanmg/src/view/system/user/SystemUser.jsx';
import SystemRole from 'E:/XiaoQiProject/xqloanmg/src/view/system/role/SystemRole.jsx';
import SystemProduct from 'E:/XiaoQiProject/xqloanmg/src/view/system/product/SystemProduct.jsx';
import SystemDict from 'E:/XiaoQiProject/xqloanmg/src/view/system/dict/SystemDict.jsx';
import SystemDictDetail from 'E:/XiaoQiProject/xqloanmg/src/view/system/dictDetail/SystemDictDetail.jsx';
import SystemBankUI from 'E:/XiaoQiProject/xqloanmg/src/view/system/bankUI/SystemBankUI.jsx';
import LimitGlobal from 'E:/XiaoQiProject/xqloanmg/src/view/limit/global/LimitGlobal.jsx';
import LimitAdjust from 'E:/XiaoQiProject/xqloanmg/src/view/limit/adjust/LimitAdjust.jsx';
import MemberList from 'E:/XiaoQiProject/xqloanmg/src/view/member/list/MemberList.jsx';
import MemberDetail from 'E:/XiaoQiProject/xqloanmg/src/view/member/detail/MemberDetail.jsx';
import ReportTongdun from 'E:/XiaoQiProject/xqloanmg/src/view/report/tongdun/ReportTongdun.jsx';
import ReportYunyinshang from 'E:/XiaoQiProject/xqloanmg/src/view/report/yunyinshang/ReportYunyinshang.jsx';
import ReportJingdong from 'E:/XiaoQiProject/xqloanmg/src/view/report/jingdong/ReportJingdong.jsx';
import ReportTaobao from 'E:/XiaoQiProject/xqloanmg/src/view/report/taobao/ReportTaobao.jsx';
import ReportTongxunlu from 'E:/XiaoQiProject/xqloanmg/src/view/report/tongxunlu/ReportTongxunlu.jsx';
import OrderAll from 'E:/XiaoQiProject/xqloanmg/src/view/order/all/OrderAll.jsx';
import OrderAuditing from 'E:/XiaoQiProject/xqloanmg/src/view/order/auditing/OrderAuditing.jsx';
import OrderAudited from 'E:/XiaoQiProject/xqloanmg/src/view/order/audited/OrderAudited.jsx';
import OrderDetail from 'E:/XiaoQiProject/xqloanmg/src/view/order/detail/OrderDetail.jsx';
import OrderAuditDetail from 'E:/XiaoQiProject/xqloanmg/src/view/order/auditDetail/OrderAuditDetail.jsx';
import OrderMachineDetail from 'E:/XiaoQiProject/xqloanmg/src/view/order/machineDetail/OrderMachineDetail.jsx';
import OrderScoreDetail from 'E:/XiaoQiProject/xqloanmg/src/view/order/scoreDetail/OrderScoreDetail.jsx';
import FinanceLoan from 'E:/XiaoQiProject/xqloanmg/src/view/finance/loan/FinanceLoan.jsx';
import FinanceRepayment from 'E:/XiaoQiProject/xqloanmg/src/view/finance/repayment/FinanceRepayment.jsx';
import Overdue from 'E:/XiaoQiProject/xqloanmg/src/view/overdue/Overdue.jsx';
  
import Login from 'E:/XiaoQiProject/xqloanmg/src/view/login/Login.jsx';
  
import ErrorPage from 'E:/XiaoQiProject/xqloanmg/src/view/404/ErrorPage.jsx';

var appConfig = {
  "404": true,
  "menu": [
    {
      "key": "/home",
      "auth": "/home",
      "title": "首页",
      "icon": "form"
    },
    {
      "key": "/system",
      "auth": "/system",
      "title": "系统管理",
      "icon": "form",
      "subMenu": [
        {
          "key": "/system/user",
          "auth": "/system/user",
          "title": "用户管理"
        },
        {
          "key": "/system/role",
          "auth": "/system/role",
          "title": "角色管理"
        },
        {
          "key": "/system/product",
          "auth": "/system/product",
          "title": "产品管理"
        },
        {
          "key": "/system/dict",
          "auth": "/system/dict",
          "title": "字典管理"
        },
        {
          "key": "/system/dictDetail",
          "title": "字典详情",
          "hidden": true
        },
        {
          "key": "/system/bankUI",
          "auth": "/system/bankUI",
          "title": "银行UI库"
        }
      ]
    },
    {
      "key": "/limit",
      "auth": "/limit",
      "title": "额度管理",
      "icon": "form",
      "subMenu": [
        {
          "key": "/limit/global",
          "auth": "/limit/global",
          "title": "全局配置"
        },
        {
          "key": "/limit/adjust",
          "auth": "/limit/adjust",
          "title": "手动调配"
        }
      ]
    },
    {
      "key": "/member",
      "auth": "/member",
      "title": "会员管理",
      "icon": "form",
      "subMenu": [
        {
          "key": "/member/list",
          "auth": "/member/list",
          "title": "会员列表"
        },
        {
          "key": "/member/detail",
          "auth": "/member/detail",
          "hidden": true,
          "title": "会员详情"
        }
      ]
    },
    {
      "key": "/report",
      "auth": "/report",
      "title": "报告",
      "hidden": true,
      "icon": "form",
      "subMenu": [
        {
          "key": "/report/tongdun",
          "title": "同盾报告"
        },
        {
          "key": "/report/yunyinshang",
          "title": "运营商报告"
        },
        {
          "key": "/report/jingdong",
          "title": "京东报告"
        },
        {
          "key": "/report/taobao",
          "title": "淘宝报告"
        },
        {
          "key": "/report/tongxunlu",
          "title": "通讯录报告"
        }
      ]
    },
    {
      "key": "/order",
      "auth": "/order",
      "title": "订单管理",
      "icon": "form",
      "subMenu": [
        {
          "key": "/order/all",
          "auth": "/order/all",
          "title": "全部订单"
        },
        {
          "key": "/order/auditing",
          "auth": "/order/auditing",
          "title": "风控待审核"
        },
        {
          "key": "/order/audited",
          "auth": "/order/audited",
          "title": "风控已审"
        },
        {
          "key": "/order/detail",
          "auth": "/order/detail",
          "hidden": true,
          "title": "订单详情"
        },
        {
          "key": "/order/auditDetail",
          "auth": "/order/auditDetail",
          "hidden": true,
          "title": "审核详情"
        },
        {
          "key": "/order/machineDetail",
          "auth": "/order/machineDetail",
          "hidden": true,
          "title": "机审详情"
        },
        {
          "key": "/order/scoreDetail",
          "auth": "/order/scoreDetail",
          "hidden": true,
          "title": "评分详情"
        }
      ]
    },
    {
      "key": "/finance",
      "auth": "/finance",
      "title": "财务管理",
      "icon": "form",
      "subMenu": [
        {
          "key": "/finance/loan",
          "auth": "/finance/loan",
          "title": "放款管理"
        },
        {
          "key": "/finance/repayment",
          "auth": "/finance/repayment",
          "title": "还款管理"
        }
      ]
    },
    {
      "key": "/overdue",
      "auth": "/overdue",
      "title": "逾期管理",
      "icon": "form"
    }
  ],
  "other": [
    {
      "key": "/login",
      "title": "登录页"
    }
  ]
};
var menuRouter = [
  {
        path: '/home',
        auth: '/home',
        component: Home,
        parent: '',
        title: '首页'
      },{
        path: '/system/user',
        auth: '/system/user',
        component: SystemUser,
        parent: '/system',
        title: '用户管理'
      },{
        path: '/system/role',
        auth: '/system/role',
        component: SystemRole,
        parent: '/system',
        title: '角色管理'
      },{
        path: '/system/product',
        auth: '/system/product',
        component: SystemProduct,
        parent: '/system',
        title: '产品管理'
      },{
        path: '/system/dict',
        auth: '/system/dict',
        component: SystemDict,
        parent: '/system',
        title: '字典管理'
      },{
        path: '/system/dictDetail',
        auth: '',
        component: SystemDictDetail,
        parent: '/system',
        title: '字典详情'
      },{
        path: '/system/bankUI',
        auth: '/system/bankUI',
        component: SystemBankUI,
        parent: '/system',
        title: '银行UI库'
      },{
        path: '/limit/global',
        auth: '/limit/global',
        component: LimitGlobal,
        parent: '/limit',
        title: '全局配置'
      },{
        path: '/limit/adjust',
        auth: '/limit/adjust',
        component: LimitAdjust,
        parent: '/limit',
        title: '手动调配'
      },{
        path: '/member/list',
        auth: '/member/list',
        component: MemberList,
        parent: '/member',
        title: '会员列表'
      },{
        path: '/member/detail',
        auth: '/member/detail',
        component: MemberDetail,
        parent: '/member',
        title: '会员详情'
      },{
        path: '/report/tongdun',
        auth: '',
        component: ReportTongdun,
        parent: '/report',
        title: '同盾报告'
      },{
        path: '/report/yunyinshang',
        auth: '',
        component: ReportYunyinshang,
        parent: '/report',
        title: '运营商报告'
      },{
        path: '/report/jingdong',
        auth: '',
        component: ReportJingdong,
        parent: '/report',
        title: '京东报告'
      },{
        path: '/report/taobao',
        auth: '',
        component: ReportTaobao,
        parent: '/report',
        title: '淘宝报告'
      },{
        path: '/report/tongxunlu',
        auth: '',
        component: ReportTongxunlu,
        parent: '/report',
        title: '通讯录报告'
      },{
        path: '/order/all',
        auth: '/order/all',
        component: OrderAll,
        parent: '/order',
        title: '全部订单'
      },{
        path: '/order/auditing',
        auth: '/order/auditing',
        component: OrderAuditing,
        parent: '/order',
        title: '风控待审核'
      },{
        path: '/order/audited',
        auth: '/order/audited',
        component: OrderAudited,
        parent: '/order',
        title: '风控已审'
      },{
        path: '/order/detail',
        auth: '/order/detail',
        component: OrderDetail,
        parent: '/order',
        title: '订单详情'
      },{
        path: '/order/auditDetail',
        auth: '/order/auditDetail',
        component: OrderAuditDetail,
        parent: '/order',
        title: '审核详情'
      },{
        path: '/order/machineDetail',
        auth: '/order/machineDetail',
        component: OrderMachineDetail,
        parent: '/order',
        title: '机审详情'
      },{
        path: '/order/scoreDetail',
        auth: '/order/scoreDetail',
        component: OrderScoreDetail,
        parent: '/order',
        title: '评分详情'
      },{
        path: '/finance/loan',
        auth: '/finance/loan',
        component: FinanceLoan,
        parent: '/finance',
        title: '放款管理'
      },{
        path: '/finance/repayment',
        auth: '/finance/repayment',
        component: FinanceRepayment,
        parent: '/finance',
        title: '还款管理'
      },{
        path: '/overdue',
        auth: '/overdue',
        component: Overdue,
        parent: '',
        title: '逾期管理'
      }
  ];

var otherRouter = [
  {
        path: '/login',
        auth: '',
        component: Login,
        title: '登录页'
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
