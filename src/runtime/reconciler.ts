import global from './global';
import Reconciler from 'react-reconciler/index.js';

export default function (...args: any[]) {
  // @ts-expect-error
  return (global.__reconciler_instance__ = Reconciler(...args));
}
