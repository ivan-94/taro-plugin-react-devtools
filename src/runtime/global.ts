// @ts-nocheck
let global: any;

if (typeof my !== 'undefined') {
  global = my;
}

if (typeof wx !== 'undefined') {
  global = wx;
}

if (typeof tt !== 'undefined') {
  global = tt;
}

if (typeof jd !== 'undefined') {
  global = jd;
}

if (typeof qq !== 'undefined') {
  global = qq;
}

if (typeof swan !== 'undefined') {
  global = swan;
}

global.$window = window;

export default global;
