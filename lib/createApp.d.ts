import * as React from 'react';
interface Props {
    logo?: (collapsed: boolean) => JSX.Element;
    header?: JSX.Element;
}
interface State {
    authInfo: any[];
    collapsed: boolean;
}
export default class App extends React.Component<Props> {
    state: State;
    constructor(props: any);
    render(): JSX.Element;
    setAuthInfo(authInfo: any): void;
    setCollapsed(bool: any): void;
    getAuth(auth: string): boolean;
}
export {};
