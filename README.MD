# math-expression-parse(数学表达式解析)

## 安装
`npm i math-expression-parse`

## 使用

```js
import {parse} from "math-expression-parse"

let data = {
    "字段1":"100",
    "字段2":"200"
}
let expression = "sum({字段1},{字段2})"

console.log(parse(data,expression)) //打印：300
```

## 公式介绍:
### 基本:
- 简单使用：`{字段1}`
- 拼接字段：`{字段1}{字段2}`
### 条件:
- 条件语句：`condition(条件,条件为真返回值,条件为假返回值)`
### 数学:
- 求和：`sum({字段1}，{字段2})`
- 取最大：`max({字段1}，{字段2})`
- 取平均数：`average({字段1}，{字段2})`
- 向下保留精度：`floor({字段1}，int 精度)`
- 两数相除：`divide({字段1}，{字段2})`
- 向上保留精度：`ceil({字段1}，int 精度)`
- 两数相减：`sub({字段1}，{字段2})`
- 四舍五入：`round({字段1}，int 精度)`