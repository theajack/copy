# [copy-util](https://github.com/theajack/copy) <a href="https://www.github.com/theajack/copy"><img src="https://img.shields.io/github/stars/theajack/copy.svg?style=social" alt="star"></a> <a href="https://www.theajack.com"><img src="https://img.shields.io/badge/author-theajack-blue.svg?style=social" alt="Author"></a>

<p>
    <a href="https://www.npmjs.com/package/copy-util"><img src="https://img.shields.io/npm/v/copy-util.svg" alt="Version"></a>
    <a href="https://npmcharts.com/compare/copy-util?minimal=true"><img src="https://img.shields.io/npm/dm/copy-util.svg" alt="Downloads"></a>
    <a href="https://cdn.jsdelivr.net/gh/theajack/copy/cdn/copyutil.latest.min.js"><img src="https://img.shields.io/bundlephobia/minzip/copy-util.svg" alt="Size"></a>
    <a href="https://github.com/theajack/copy/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/copy-util.svg" alt="License"></a>
    <a href="https://github.com/theajack/copy/search?l=javascript"><img src="https://img.shields.io/github/languages/top/theajack/copy.svg" alt="TopLang"></a>
    <a href="https://github.com/theajack/copy/issues"><img src="https://img.shields.io/github/issues-closed/theajack/copy.svg" alt="issue"></a>
</p>

### 🚀 简单易用、体积小巧的 web 复制文本 js 库

**[在线试用](https://theajack.gitee.io/copy)**

---

### 0.快速使用

使用 npm 安装：

```
npm i copy-util
```

```js
import Copy from 'copy-util';
Copy('Copy something'); // 一句代码搞定复制文本
```

使用 script 标签使用：

```html
<script src="https://cdn.jsdelivr.net/gh/theajack/copy/cdn/copyutil.latest.min.js"></script>
<!--
或通过版本号引用
<script src="https://cdn.jsdelivr.net/gh/theajack/copy/cdn/copyutil.{version}.min.js"></script>
-->
<script>
    Copy('Copy something');
</script>
```

### 1. 功能

1. 一句代码搞定浏览器端复制文本
2. 体积仅 1.41 kb
3. 支持结合 dom 使用， 无需编写 js 代码
4. 兼容性良好，支持主流浏览器
5. typescript 支持

### 2. API

#### 2.1. Copy(string)

`copy-util` 仅用一行代码就可以搞定 web 端文本复制

该方法返回一个布尔类型，表示复制是否成功:

```js
import Copy from 'copy-util';
var isSuccess = Copy('Copy something'); // 一句代码搞定复制文本
// 该方法返回一个布尔类型，表示复制是否成功
```

#### 2.2. Copy(object)

您可以使用配置来绑定需要复制的 dom 元素和需要复制的内容类型:

```html
<input id="inputEl" /> <span id="spanEl">some text</span>
```

```js
import Copy from 'copy-util';

Copy({
    el: '#inputEl' // 使用选择器, 如果有多个dom只会取用第一个
});

Copy({
    el: document.getElementById('spanEl'), // 使用dom元素
    type: 'text' // 指定复制的类型
});
```

参数:

el: el 可以是选择器或者一个 dom 元素

type: type 表示要复制的类型，可选值有 `value`, `text`, `html`, `src`, `href`。默认值为 `value`

#### 2.3. DOM 绑定

除了使用 api 方式调用`copy-util`之外，还可以绑定 DOM 使用，这样就可以无需编写 js 代码：

```html
<input id="inputEl" />
<!--从某个dom元素复制内容-->
<button copy-el="#inputEl" copy-type="value">Copy from dom</button>
<!--直接复制文本-->
<button copy-text="some text">Copy text</button>
```

属性：

copy-el：与 2.2 中的参数 el 同样的含义

copy-type： 2.2 中的参数 type 同样的含义

copy-text：需要复制的文本，支持动态修改

#### 2.4. Copy.init()

2.3 中绑定 DOM 默认会在 DOM 加载完成之后初始化相关元素和事件，但是在某些场景下（比如 vue 组件或是动态插入的 dom）会不起作用，此时只需要在 dom 加载完成之后手动调用 `Copy.init()` 即可完成初始化
