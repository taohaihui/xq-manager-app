"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var rc_notification_1 = require("rc-notification");
var antd_1 = require("antd");
var openTimes = 0; //加载次数
var notificationIns = null; //实例
// 全局loading
function spin() {
    if (openTimes === 0) {
        openTimes = 1;
        // 初始化Notification
        rc_notification_1.default.newInstance({
            getContainer: function () { return document.body; },
            style: {}
        }, function (notification) {
            notificationIns = notification;
            notificationIns.notice({
                duration: 0,
                style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0)',
                    zIndex: 100000
                },
                content: (React.createElement("div", { style: {
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%,-50%)'
                    } },
                    React.createElement(antd_1.Spin, null)))
            });
        });
    }
    else {
        openTimes = openTimes + 1;
    }
}
function removeSpin(removeAll) {
    if (removeAll === void 0) { removeAll = false; }
    // 清除全部加载图标
    if (removeAll && openTimes > 0) {
        openTimes = 0;
        notificationIns.destroy();
        return;
    }
    // 按次清除加载图标
    openTimes = openTimes - 1;
    if (openTimes === 0) {
        notificationIns.destroy();
    }
    if (openTimes < 0) {
        openTimes = 0;
    }
}
exports.default = {
    spin: spin,
    removeSpin: removeSpin
};
