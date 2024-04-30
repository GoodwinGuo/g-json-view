// 详见https://prettier.io/docs/en/options.html
module.exports = {
  printWidth: 80, // 每行的长度
  tabWidth: 2, // 缩进的空格数
  useTabs: false, // 用tabs而不是空格缩进
  semi: true, // 每个语句末尾是否加分号，false只有在编译报错时才加
  singleQuote: false, // 使用单引号代替双引号，jsx引号规则将会忽略此配置。
  quoteProps: "as-needed", //
  jsxSingleQuote: false, // 在jsx中使用单引号代替双引号
  trailingComma: "es5", // 是否有末尾的逗号，例如数组或对象的最后一项。/es5/none/all
  bracketSpacing: false, // 在对象字面量{}的语法中打印空格
  jsxBracketSameLine: false, // 开始标签的>是否和之前内容在同一行
  arrowParens: "always", // 箭头函数的参数是否加括号 /always/avoid
  rangeStart: 0, // 需要格式化的开始位置
  rangeEnd: Infinity, // 需要格式化的结束位置
};