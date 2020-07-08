const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

let appConfigPath = path.resolve(process.cwd(), 'src/app.config.json');

let appConfig = null;

try {
  appConfig = JSON.parse(fs.readFileSync(appConfigPath));
} catch (e) {
  console.log(chalk.red('src目录下未配置app.config.json文件'));
  process.exit(1);
}

if (appConfig.menu && !Array.isArray(appConfig.menu)) {
  console.log(chalk.red('menu字段应该是一个Array'));
  process.exit(1);
}

if (appConfig.other && !Array.isArray(appConfig.other)) {
  console.log(chalk.red('other字段应该是一个Array'));
  process.exit(1);
}

let nowDir = process.cwd();

let menuDir = appConfig.menu ? getPageDir(appConfig.menu) : { newPath: [], allPath: [] };
let otherDir = appConfig.other ? getPageDir(appConfig.other) : { newPath: [], allPath: [] };
let errDir = appConfig['404'] ? getPageDir([{ key: '/404', 'title': '错误页面' }]) : { newPath: [], allPath: [] };

let newPagePath = [...menuDir.newPath, ...otherDir.newPath, ...errDir.newPath]; // 新增页面
let menuallPagePath = menuDir.allPath; // 导航栏的所有页面
let otherallPagePath = otherDir.allPath; // 其它全局页面
let errallPagePath = errDir.allPath; // 404页面

// 写入页面模板文件
interface dirItem {
  dir: string,
  title: string,
  ComponentName: string
}
newPagePath.forEach((item: dirItem) => {
  fs.ensureDir(item.dir).then(() => {
    fs.copy(path.resolve(__dirname, './template'), item.dir).then(() => {
      let textJSX = fs.readFileSync(path.resolve(item.dir, 'index.jsx'), { encoding: 'utf8' });
      let textCSS = fs.readFileSync(path.resolve(item.dir, 'style.scss'), { encoding: 'utf8' });

      textJSX = textJSX.replace(/ComponentName/g, item.ComponentName);
      textJSX = textJSX.replace(/ComponentContent/g, item.title);
      textJSX = textJSX.replace(/ComponentPage/g, item.title);
      textJSX = textJSX.replace(/ComponentClassName/g, item.ComponentName);

      textCSS = textCSS.replace('className', item.ComponentName);

      fs.writeFileSync(path.resolve(item.dir, `${item.ComponentName}.jsx`), textJSX, { encoding: 'utf8' });
      fs.writeFileSync(path.resolve(item.dir, `${item.ComponentName}.scss`), textCSS, { encoding: 'utf8' });

      fs.remove(path.resolve(item.dir, 'index.jsx'));
      fs.remove(path.resolve(item.dir, 'style.scss'));
    }).catch(err => {
      console.log(chalk.red('error:拷贝文件失败'));
      console.log(err);
      process.exit(1);
    });
  });
});

writeRouterFile();

// 重写router.js文件
function writeRouterFile() {
  let routerText = `
${
    menuallPagePath.map(item => {
      let name = item.ComponentName;
      return `import ${name} from '${item.dir.replace(/\\/g, '/')}/${name}.jsx';`
    }).join('\n')
    }
  
${
    otherallPagePath.map(item => {
      let name = item.ComponentName;
      return `import ${name} from '${item.dir.replace(/\\/g, '/')}/${name}.jsx';`
    }).join('\n')
    }
  
${
    errallPagePath.map(item => {
      let name = item.ComponentName;
      return `import ${name} from '${item.dir.replace(/\\/g, '/')}/${name}.jsx';`
    }).join('\n')
    }

var appConfig = ${JSON.stringify(appConfig, null, 2)};
var menuRouter = [
  ${
    menuallPagePath.map(item => {
      return `{
        path: '${item.path}',
        auth: '${item.auth}',
        component: ${item.ComponentName},
        parent: '${item.parent}',
        title: '${item.title}'
      }`;
    })
    }
  ];

var otherRouter = [
  ${
    otherallPagePath.map(item => {
      return `{
        path: '${item.path}',
        auth: '${item.auth}',
        component: ${item.ComponentName},
        title: '${item.title}'
      }`;
    })
    }
];

var errRouter = [
  ${
    errallPagePath.map(item => {
      return `{
        path: '${item.path}',
        component: ${item.ComponentName},
        title: '${item.title}'
      }`;
    })
    }
];

export {
  menuRouter,
  otherRouter,
  errRouter,
  appConfig
};
`;
  fs.writeFileSync(path.resolve(__dirname, 'router.js'), routerText, { encoding: 'utf8' });
}



// 递归找到还未创建的路径
interface MenuItem {
  key: string,
  auth: string,
  title: string,
  subMenu?: []
}
function getPageDir(menu: any[], parent?: string): { newPath: any[], allPath: any[] } {
  let newPath = [];
  let allPath = [];

  menu.forEach((item: MenuItem) => {
    if (item.subMenu) {
      let pathDir = getPageDir(item.subMenu, item.key);
      newPath = [...newPath, ...pathDir.newPath];
      allPath = [...allPath, ...pathDir.allPath];
    } else {
      let pageDir = path.join(nowDir, 'src/view', item.key);

      try {
        fs.statSync(pageDir).isDirectory(); // 
      } catch (e) {
        newPath.push({
          dir: pageDir,
          title: item.title,
          ComponentName: item.key === '/404' ? 'ErrorPage' : camelize(item.key)
        });
      }

      allPath.push({
        path: item.key,
        auth: item.auth || '',
        dir: pageDir,
        title: item.title,
        parent: parent || '',
        ComponentName: item.key === '/404' ? 'ErrorPage' : camelize(item.key)
      });
    }
  });

  return {
    newPath,
    allPath
  };
}

// 驼峰化
function camelize(str) {
  return str.replace(/[\/]+(.)?/g, function (match, c) {
    return c ? c.toUpperCase() : '';
  });
}