/**
 * 注入运行时
 */
export default function (content: string) {
  return `import 'taro-plugin-react-devtools/dist/runtime/index.js';\n` +  content;
}
