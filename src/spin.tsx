import * as React from 'react';
import Notification from 'rc-notification';
import { Spin } from 'antd';

let openTimes = 0; //加载次数
let notificationIns = null; //实例



// 全局loading
function spin() {
  if (openTimes === 0) {
    openTimes = 1;
    // 初始化Notification
    Notification.newInstance({
      getContainer: () => document.body,
      style: {

      }
    }, notification => {
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
        content: (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%,-50%)'
            }}>
            <Spin />
          </div>
        )
      });
    });
  } else {
    openTimes = openTimes + 1;
  }
}

function removeSpin(removeAll = false) {
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

export default {
  spin,
  removeSpin
}