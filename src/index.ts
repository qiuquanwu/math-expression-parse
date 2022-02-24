import _, { isEmpty, isNumber } from "lodash-es"
import hasMathStr from "./hasMath";
import strFullHalf from "./strFullHalf";
const _parse = function (data: any, expression: string) {
  if (isEmpty(expression)) {
    return ""
  }
  function evil(fn: any) {
    var Fn = Function;  //一个变量指向Function，防止有些前端编译工具报错
    return new Fn("return " + fn)();
  }
  //将全角转化为半角
  let jsStr = strFullHalf(expression);
  //求和
  const sum = function () {
    return _.sum(arguments);
  };
  /**最大值 */
  const max = function () {
    return _.max(arguments);
  };
  /**最大值 */
  const min = function () {
    return _.min(arguments);
  };
  /**平均数 */
  const average = function () {
    return _.mean(arguments);
  };
  /**向下保留精度 */
  const floor = _.floor;
  /**两数相除 */
  const divide = _.divide;
  const ceil = _.ceil;
  /**两数相乘 */
  const multiply = _.multiply;
  /**四舍五入 */
  const round = _.round;
  /**两数相减 */
  const sub = _.subtract;

  const condition = (x: boolean, y: any, z: any) => {
    return x ? y : z;
  };
  const all = [sum,max,min,average,floor,divide,ceil,multiply,round,sub,condition]
  /**先对字符验证是否包含函数 */
  let isMathStr = hasMathStr(jsStr);
  if (isEmpty(data) && all.length>0) {
    return eval(jsStr);
  }
  const keys = Object.keys(data);
  keys.forEach((key: string) => {
    let value = data[key] ? data[key] : ""
    if (isNumber(value)) {
      jsStr = jsStr.replace(`{${key}}`, value.toString());
    } else if (isMathStr) {
      jsStr = jsStr.replace(`{${key}}`, `"${value}"`);
    } else {
      jsStr = jsStr.replace(`{${key}}`, value);
    }
  });
  console.log("jsStr", jsStr)
  /**如果包含数学函数 */
  if (isMathStr) {
    try {
      let res = eval(jsStr);
      // let res = new Function("return " + jsStr)();
      return res;
    } catch (error) {
      return '公式有错误,请修改！';
    }
  }
  return jsStr;
}

export const parse = _parse