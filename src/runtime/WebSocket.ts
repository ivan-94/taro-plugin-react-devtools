import Taro from '@tarojs/taro';

enum ReadyState {
  CONNECTING,
  OPEN,
  CLOSING,
  CLOSED,
}

export default class WebSocket {
  readyState: ReadyState;
  CONNECTING = ReadyState.CONNECTING;
  OPEN = ReadyState.OPEN;
  CLOSING = ReadyState.CLOSING;
  CLOSED = ReadyState.CLOSED;
  onopen?: any;
  onerror?: any;
  onclose?: any;
  onmessage?: any;
  ws: any;

  constructor(url: string) {
    this.readyState = ReadyState.CONNECTING;
    this.setup(url);
  }

  setup(url: string) {
    Taro.connectSocket({
      url,
    });

    Taro.onSocketOpen(() => {
      this.readyState = ReadyState.OPEN;
      if (typeof this.onopen === 'function') {
        this.onopen();
      }
    });

    Taro.onSocketError((res: any) => {
      if (typeof this.onerror === 'function') {
        this.onerror(res);
      }
    });

    Taro.onSocketClose(() => {
      this.readyState = ReadyState.CLOSED;
      if (typeof this.onclose === 'function') {
        this.onclose();
      }
    });

    Taro.onSocketMessage((res: any) => {
      if (typeof this.onmessage === 'function') {
        this.onmessage(res);
      }
    });
  }

  send(payload: any) {
    Taro.sendSocketMessage({
      data: payload,
    });
  }
}
