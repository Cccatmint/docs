# 在vue项目中使用stylelint规范css代码

1.首先需要在vscode中安装扩展插件`Stylelint`

`ctrl+shift+p`设置vscode 的settings.json添加如下内容

```json
"editor.codeActionsOnSave": {
        "source.fixAll": true,
    },
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript"
    ],
    "eslint.alwaysShowStatus": true,
    "stylelint.validate": [
        "css",
        "less",
        "postcss",
        "scss",
        "vue",
        "sass"
    ],
```



2.安装包

`npm i stylelint@13.13.1 -D `

`npm i stylelint-config-standard@22.0.0 -D`

`npm i stylelint-order@4.1 -D`

`npm i stylelint-scss@3.21.0 -D`



3.在根目录下添加文件

.stylelintrc.js

```js
module.exports = {
    extends: ['stylelint-config-standard'],
    plugins: ['stylelint-order'],
    rules: {
        'no-descending-specificity': null,
        'function-url-quotes': 'always',
        'string-quotes': 'double',
        indentation: 4,
        'unit-case': null,
        'color-hex-case': 'lower',
        'color-hex-length': 'long',
        'rule-empty-line-before': 'never',
        'font-family-no-missing-generic-family-keyword': null,
        'block-opening-brace-space-before': 'always',
        'property-no-unknown': null,
        'no-empty-source': null,
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['deep'],
            },
        ],
        'order/properties-order': [
            'position',
            'top',
            'right',
            'bottom',
            'left',
            'z-index',
            'display',
            'justify-content',
            'align-items',
            'float',
            'clear',
            'overflow',
            'overflow-x',
            'overflow-y',
            'margin',
            'margin-top',
            'margin-right',
            'margin-bottom',
            'margin-left',
            'padding',
            'padding-top',
            'padding-right',
            'padding-bottom',
            'padding-left',
            'width',
            'min-width',
            'max-width',
            'height',
            'min-height',
            'max-height',
            'font-size',
            'font-family',
            'font-weight',
            'border',
            'border-style',
            'border-width',
            'border-color',
            'border-top',
            'border-top-style',
            'border-top-width',
            'border-top-color',
            'border-right',
            'border-right-style',
            'border-right-width',
            'border-right-color',
            'border-bottom',
            'border-bottom-style',
            'border-bottom-width',
            'border-bottom-color',
            'border-left',
            'border-left-style',
            'border-left-width',
            'border-left-color',
            'border-radius',
            'text-align',
            'text-justify',
            'text-indent',
            'text-overflow',
            'text-decoration',
            'white-space',
            'color',
            'background',
            'background-position',
            'background-repeat',
            'background-size',
            'background-color',
            'background-clip',
            'opacity',
            'filter',
            'list-style',
            'outline',
            'visibility',
            'box-shadow',
            'text-shadow',
            'resize',
            'transition',
        ],
    },
}

```



*参考*

> https://juejin.cn/post/6995973631238995998
>
> https://juejin.cn/post/7022720509875847182

