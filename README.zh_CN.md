
简体中文 | [English](./README.md)

## 特性

- 一个 JSON 查看工具

## Props

| 属性                     | 说明                                        | 类型                              | 默认值        |
| ------------------------ | ------------------------------------------- | --------------------------------- | ------------- |
| json                     | 源数据，注意不是 `JSON` 字符串                | `JSON` 数据对象                   | -             |
| deep                     | 深度，大于等于该深度的节点将被折叠             | number                            | 4      |
| showLength               | 在数据折叠的时候展示长度                      | boolean                           | true         |
| showLine                 | 展示标识线                                   | boolean                           | true          |
| showIcon                 | 展示图标                                     | boolean                           | true         |
| showDoubleQuotes         | 展示 key 名的双引号                           | boolean                           | true          |
| rootPath                 | 定义最顶层数据路径                            | string                            | `root`        |
| collapsedOnClickBrackets | 支持点击括号或文字折叠                        | boolean                           | true          |
| renderNodeKey            | 渲染节点键                                   | ({ node, defaultKey }) => vNode   | -             |
| renderNodeValue          | 自定义渲染节点值                              | ({ node, defaultValue }) => vNode | -             |
| nodeClick                | 点击节点时触发                               | ({ isClosed, path }) => void       | -             |


