declare const fs: any;
declare const path: any;
declare const chalk: any;
declare let appConfigPath: any;
declare let appConfig: any;
declare let nowDir: string;
declare let menuDir: {
    newPath: any[];
    allPath: any[];
};
declare let otherDir: {
    newPath: any[];
    allPath: any[];
};
declare let errDir: {
    newPath: any[];
    allPath: any[];
};
declare let newPagePath: any[];
declare let menuallPagePath: any[];
declare let otherallPagePath: any[];
declare let errallPagePath: any[];
interface dirItem {
    dir: string;
    title: string;
    ComponentName: string;
}
declare function writeRouterFile(): void;
interface MenuItem {
    key: string;
    title: string;
    subMenu?: [];
}
declare function getPageDir(menu: any[], parent?: string): {
    newPath: any[];
    allPath: any[];
};
declare function camelize(str: any): any;
