import * as React from 'react';
interface Props {
    logo?: (collapsed: boolean) => JSX.Element;
    headerHeight?: number;
    headerComponent?: JSX.Element;
    logout?: () => void;
}
interface State {
    authInfo: any[];
    collapsed: boolean;
}
export default class App extends React.Component<Props> {
    state: State;
    static defaultProps: {
        headerHeight: number;
    };
    constructor(props: any);
    static setSession(name: any, value: any): void;
    static getSession(name: any): any;
    componentDidMount(): void;
    render(): JSX.Element;
    getAuthInfo(): void;
    setAuthInfo(authInfo: any): void;
    setCollapsed(bool: any): void;
    getAuth(auth: string): boolean;
}
export {};
