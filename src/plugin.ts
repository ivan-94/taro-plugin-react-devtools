import { WebpackPluginInstance, Compiler } from 'webpack';
import { META_TYPE } from '@tarojs/helper';

const NAME = 'InjectLoaderToEntryPlugin';
const LOADER_NAME = require.resolve('./loader');

export default class InjectLoaderToEntryPlugin
  implements WebpackPluginInstance {
  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(NAME, (comp) => {
      comp.hooks.normalModuleLoader.tap(NAME, (loaderContext, module) => {
        if (
          // @ts-expect-error
          module.miniType == META_TYPE.ENTRY &&
          !module.loaders.some((i) => {
            i.loader === LOADER_NAME;
          })
        ) {
          module.loaders.push({
            loader: LOADER_NAME,
            options: {},
            ident: null,
            type: null,
          });
        }
      });
    });
  }
}
