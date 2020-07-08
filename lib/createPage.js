var fs = require('fs-extra');
var path = require('path');
var chalk = require('chalk');
var appConfigPath = path.resolve(process.cwd(), 'src/app.config.json');
var appConfig = null;
try {
    appConfig = JSON.parse(fs.readFileSync(appConfigPath));
}
catch (e) {
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
var nowDir = process.cwd();
var menuDir = appConfig.menu ? getPageDir(appConfig.menu) : { newPath: [], allPath: [] };
var otherDir = appConfig.other ? getPageDir(appConfig.other) : { newPath: [], allPath: [] };
var errDir = appConfig['404'] ? getPageDir([{ key: '/404', 'title': '错误页面' }]) : { newPath: [], allPath: [] };
var newPagePath = menuDir.newPath.concat(otherDir.newPath, errDir.newPath); // 新增页面
var menuallPagePath = menuDir.allPath; // 导航栏的所有页面
var otherallPagePath = otherDir.allPath; // 其它全局页面
var errallPagePath = errDir.allPath; // 404页面
newPagePath.forEach(function (item) {
    fs.ensureDir(item.dir).then(function () {
        fs.copy(path.resolve(__dirname, './template'), item.dir).then(function () {
            var textJSX = fs.readFileSync(path.resolve(item.dir, 'index.jsx'), { encoding: 'utf8' });
            var textCSS = fs.readFileSync(path.resolve(item.dir, 'style.scss'), { encoding: 'utf8' });
            textJSX = textJSX.replace(/ComponentName/g, item.ComponentName);
            textJSX = textJSX.replace(/ComponentContent/g, item.title);
            textJSX = textJSX.replace(/ComponentPage/g, item.title);
            textJSX = textJSX.replace(/ComponentClassName/g, item.ComponentName);
            textCSS = textCSS.replace('className', item.ComponentName);
            fs.writeFileSync(path.resolve(item.dir, item.ComponentName + ".jsx"), textJSX, { encoding: 'utf8' });
            fs.writeFileSync(path.resolve(item.dir, item.ComponentName + ".scss"), textCSS, { encoding: 'utf8' });
            fs.remove(path.resolve(item.dir, 'index.jsx'));
            fs.remove(path.resolve(item.dir, 'style.scss'));
        }).catch(function (err) {
            console.log(chalk.red('error:拷贝文件失败'));
            console.log(err);
            process.exit(1);
        });
    });
});
writeRouterFile();
// 重写router.js文件
function writeRouterFile() {
    var routerText = "\n" + menuallPagePath.map(function (item) {
        var name = item.ComponentName;
        return "import " + name + " from '" + item.dir.replace(/\\/g, '/') + "/" + name + ".jsx';";
    }).join('\n') + "\n  \n" + otherallPagePath.map(function (item) {
        var name = item.ComponentName;
        return "import " + name + " from '" + item.dir.replace(/\\/g, '/') + "/" + name + ".jsx';";
    }).join('\n') + "\n  \n" + errallPagePath.map(function (item) {
        var name = item.ComponentName;
        return "import " + name + " from '" + item.dir.replace(/\\/g, '/') + "/" + name + ".jsx';";
    }).join('\n') + "\n\nvar appConfig = " + JSON.stringify(appConfig, null, 2) + ";\nvar menuRouter = [\n  " + menuallPagePath.map(function (item) {
        return "{\n        path: '" + item.path + "',\n        auth: '" + item.auth + "',\n        component: " + item.ComponentName + ",\n        parent: '" + item.parent + "',\n        title: '" + item.title + "'\n      }";
    }) + "\n  ];\n\nvar otherRouter = [\n  " + otherallPagePath.map(function (item) {
        return "{\n        path: '" + item.path + "',\n        auth: '" + item.auth + "',\n        component: " + item.ComponentName + ",\n        title: '" + item.title + "'\n      }";
    }) + "\n];\n\nvar errRouter = [\n  " + errallPagePath.map(function (item) {
        return "{\n        path: '" + item.path + "',\n        component: " + item.ComponentName + ",\n        title: '" + item.title + "'\n      }";
    }) + "\n];\n\nexport {\n  menuRouter,\n  otherRouter,\n  errRouter,\n  appConfig\n};\n";
    fs.writeFileSync(path.resolve(__dirname, 'router.js'), routerText, { encoding: 'utf8' });
}
function getPageDir(menu, parent) {
    var newPath = [];
    var allPath = [];
    menu.forEach(function (item) {
        if (item.subMenu) {
            var pathDir = getPageDir(item.subMenu, item.key);
            newPath = newPath.concat(pathDir.newPath);
            allPath = allPath.concat(pathDir.allPath);
        }
        else {
            var pageDir = path.join(nowDir, 'src/view', item.key);
            try {
                fs.statSync(pageDir).isDirectory(); // 
            }
            catch (e) {
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
        newPath: newPath,
        allPath: allPath
    };
}
// 驼峰化
function camelize(str) {
    return str.replace(/[\/]+(.)?/g, function (match, c) {
        return c ? c.toUpperCase() : '';
    });
}
