import * as React from 'react';
import PerfectScrollbar from 'perfect-scrollbar';
import 'antd/dist/antd.css';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
interface Props {
    openKeys: string[];
    selectedKeys: string[];
    collapsed: boolean;
    setCollapsed: (bool: boolean) => void;
    getAuth: (auth: string) => boolean;
    menu: any[];
    location: {
        state: boolean;
    };
    breadcrumb: {
        path: string;
        name: string;
        closable: boolean;
    }[];
    activekey: string;
    setBreadcrumb: ([]: any[], string?: any) => void;
    setAuthInfo: (authInfo: []) => void;
    historyType: string;
    navType?: string;
    logo?: (collapsed: boolean) => JSX.Element;
    headerHeight?: number;
    headerComponent?: JSX.Element;
    children?: any;
}
interface State {
    openKeys: string[];
    selectedKeys: string[];
    collapsed: boolean;
    siderWidth: number;
}
export default class MenuRoot extends React.Component<Props> {
    state: State;
    pathData: {
        path: string;
        name: string;
    }[];
    menuScroll: PerfectScrollbar;
    contentScroll: PerfectScrollbar;
    history: any;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    handleOpen(openKeys: any): void;
    handleMenu(params: any): void;
    deleteBreadcrumb(deleteKeys?: any[]): void;
    setBreadcrumb(breadcrumb: any): void;
    filterBreadcrumb(breadcrumb: any): {
        path: string;
        name: string;
        closable: boolean;
    }[];
    handelToggle(): void;
    renderTabs(): JSX.Element;
    renderBreadcrumb(): JSX.Element;
    handleTabs(path: any): void;
    handleDelete(key: any): void;
    handleBreadcrumb(path: any, e: any): void;
    renderMenu(menu: any[]): JSX.Element[];
}
export {};
