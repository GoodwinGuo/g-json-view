
<h1 align="center">
  <a href="https://github.com/GoodwinGuo/g-json-view.git" target="_blank">G Json View</a>
</h1>

<div align="center">

<p>A Vue component for rendering JSON data as a tree structure.</p>
<p>It supports Vue3 at least.</p>

[![Build Status](https://travis-ci.org/GoodwinGuo/g-json-view.svg?branch=master)](https://travis-ci.org/GoodwinGuo/g-json-view)
[![npm package](https://img.shields.io/npm/v/g-json-view.svg)](https://www.npmjs.org/package/g-json-view)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/GoodwinGuo/g-json-view/blob/master/LICENSE)
[![Sizes](https://img.shields.io/bundlephobia/min/g-json-view)](https://bundlephobia.com/result?p=g-json-view)
[![NPM downloads](http://img.shields.io/npm/dm/g-json-view.svg?style=flat-square)](https://www.npmtrends.com/g-json-view)
[![Issues](https://img.shields.io/github/issues-raw/GoodwinGuo/g-json-view)](https://github.com/GoodwinGuo/g-json-view/issues)

</div>

[![](./src/assets/Snipaste.png)](https://github.com/GoodwinGuo/g-json-view.git)

English | [简体中文](./README.zh_CN.md)

## Features

- As a JSON Formatter.
- ...

## Using NPM or Yarn

```bash
$ npm install g-json-view --save
```

```bash
$ yarn add g-json-view
```

## Usage

```vue
<template>
  <div>
    <g-json-view :json="{ key: 'value' }" />
  </div>
</template>

<script>
import GJsonView from 'g-json-view';

export default {
  components: {
    GJsonView,
  },
};
</script>
```

## Props

| Property                 | Description                                                 | Type                              | Default |
| ------------------------ | ----------------------------------------------------------- | --------------------------------- | ------- |
| json                     | JSON data                                                   | JSON object                       | -       |
| deep                     | Paths greater than or equal to this depth will be collapsed | number                            | 4       |
| showLength               | Show the length when collapsed                              | boolean                           | true   |
| showLine                 | Show the line                                               | boolean                           | true    |
| showIcon                 | Show the icon                                               | boolean                           | true   |
| showDoubleQuotes         | Show doublequotes on key                                    | boolean                           | true    |
| rootPath                 | Root data path                                              | string                            | `root`  |
| collapsedOnClickBrackets | Support click brackets or text  to collapse                 | boolean                           | true    |
| renderNodeKey            | render node key                                             | ({ node, defaultKey }) => vNode   | -       |
| renderNodeValue          | render node value                                           | ({ node, defaultValue }) => vNode | -       |
| nodeClick                | triggered when a node is clicked                            | ({ isClosed, path }) => void      | -       |

## Events

| Event Name     | Description                              | Parameters           |
| -------------- | ---------------------------------------- | -------------------- |
| nodeClick      | triggers when click node                 | (node: NodeData)     |

## Contributors

<a href="https://github.com/GoodwinGuo/g-json-view/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=GoodwinGuo/g-json-view" />
</a>
