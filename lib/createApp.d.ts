import * as React from 'react';
interface Props {
    logo?: (collapsed: boolean) => JSX.Element;
    headerHeight?: number;
    headerComponent?: JSX.Element;
    navType?: string;
    tabNum?: number;
}
interface State {
    authInfo: any[];
    collapsed: boolean;
    breadcrumb: {
        path: string;
        name: string;
        closable: boolean;
    }[];
    tabActiveKey: string;
}
export default class App extends React.Component<Props> {
    state: State;
    static defaultProps: {
        headerHeight: number;
        navType: string;
        tabNum: number;
    };
    constructor(props: any);
    static setSession(name: any, value: any): void;
    static getSession(name: any): any;
    static clear(): void;
    componentDidMount(): void;
    render(): JSX.Element;
    getAuthInfo(): void;
    setAuthInfo(authInfo: any): void;
    getBreadcrumb(): void;
    setBreadcrumb(nextBreadcrumb: any, tabActiveKey: any): void;
    setCollapsed(bool: any): void;
    getAuth(auth: string): boolean;
}
export {};
