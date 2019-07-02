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
    setAuthInfo: (authInfo: []) => void;
    logo?: (collapsed: boolean) => JSX.Element;
    logout?: () => void;
    header?: JSX.Element;
    children?: any;
}
interface State {
    openKeys: string[];
    selectedKeys: string[];
    collapsed: boolean;
    breadcrumb?: any[];
}
export default class MenuRoot extends React.Component<Props> {
    state: State;
    menuScroll: PerfectScrollbar;
    contentScroll: PerfectScrollbar;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    handleOpen(openKeys: any): void;
    handleMenu(params: any): void;
    setBreadcrumb(breadcrumb: any): void;
    handelToggle(): void;
    handleLogOut(): void;
    renderBreadcrumb(): JSX.Element;
    handleBreadcrumb(path: any, e: any): void;
    renderMenu(menu: any[]): JSX.Element[];
}
export {};
