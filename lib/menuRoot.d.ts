import * as React from 'react';
import PerfectScrollbar from 'perfect-scrollbar';
import 'antd/dist/antd.css';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
interface Props {
    openKeys: string[];
    selectedKeys: string[];
    menu: any[];
    location: {
        state: boolean;
    };
    logo?: JSX.Element;
    header?: JSX.Element;
}
interface State {
    openKeys: string[];
    selectedKeys: string[];
    collapsed: boolean;
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
    handelToggle(): void;
    renderMenu(menu: any[]): JSX.Element[];
}
export {};
