import global from './global';
import WebSocket from './WebSocket';
// 触发 Reconciler 初始化
import '@tarojs/react';
import React from 'react';
// @ts-ignore
import { connectToDevTools } from 'react-devtools-core';

try {
  // polyfills 避免报错
  {
    if (typeof Node != 'undefined' && Node.ELEMENT_NODE == null) {
      // @ts-ignore
      Node.ELEMENT_NODE = 1;
    }
    if (
      typeof Element !== 'undefined' &&
      Element.prototype.getBoundingClientRect == null
    ) {
      // @ts-ignore
      Element.prototype.getBoundingClientRect = () => ({
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      });
    }
  }

  console.log(
    '尝试连接 React DevTools，请忽略连接错误信息，详情请参考 https://remaxjs.org/guide/basic/devtools'
  );

  connectToDevTools({
    websocket: new WebSocket('ws://127.0.0.1:8097'),
  });

  if (global.__reconciler_instance__) {
    global.__reconciler_instance__.injectIntoDevTools({
      bundleType: 1,
      version: React.version,
      rendererPackageName: 'Taro-React',
    });
  }
} catch (e) {
  // ignore
  console.error(e);
}
