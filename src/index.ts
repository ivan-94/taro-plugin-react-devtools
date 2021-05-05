import webpack from 'webpack';
import { IPluginContext } from '@tarojs/service';

import InjectLoaderToEntryPlugin from './plugin';
import { getGlobalName } from './utils';

export default function (ctx: IPluginContext, options: unknown) {
  const globalName = getGlobalName();

  if (
    globalName == null ||
    process.env.NODE_ENV !== 'development' ||
    ctx.initialConfig.framework !== 'react'
  ) {
    return;
  }

  console.log('React Devtools 已开启');

  if (ctx.initialConfig.mini) {
    // 引入开发版 React 套件
    ctx.initialConfig.mini.debugReact = true;
  }

  ctx.modifyWebpackChain(({ chain }) => {
    // 注入运行时代码到
    chain.plugin('plugin-react-devtools').use(InjectLoaderToEntryPlugin);

    // react reconciler __REACT_DEVTOOLS_GLOBAL_HOOK__ 改写
    chain.plugin('plugin-react-devtools-define').use(webpack.DefinePlugin, [
      {
        __REACT_DEVTOOLS_GLOBAL_HOOK__: `${globalName}.$window.__REACT_DEVTOOLS_GLOBAL_HOOK__`,
      },
    ]);

    chain
      .plugin('plugin-react-devtools-provider')
      .use(webpack.ProvidePlugin, [{ Node: ['@tarojs/runtime', 'TaroNode'] }]);

    // 拦截 react reconciler，来获取对应Reconciler 实例
    chain.resolve.alias.set(
      'react-reconciler$',
      require.resolve('taro-plugin-react-devtools/dist/runtime/reconciler.js')
    );
  });
}
