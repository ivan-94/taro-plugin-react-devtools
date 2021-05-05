const GLOBAL_OBJECT_MAP: { [env: string]: string } = {
  alipay: 'my',
  tt: 'tt',
  weapp: 'wx',
  jd: 'jd',
  qq: 'qq',
  swan: 'swan',
};

export function getGlobalName() {
  return GLOBAL_OBJECT_MAP[process.env.TARO_ENV || ''];
}
