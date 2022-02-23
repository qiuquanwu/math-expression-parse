import _,{isEmpty, isNumber} from "lodash-es"
import hasMathStr from "./hasMath";
import strFullHalf from "./strFullHalf";
export const parse = (data:Map<string,any>,expression:string)=>{
    if(isEmpty(data)||isEmpty(expression)){
        return ""
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
  // console.log(Object.keys(row.values));
  /**先对字符验证是否包含函数 */
  let isMathStr = hasMathStr(jsStr);
  const keys = Object.keys(data);
  keys.forEach((key:string) => {
    let value = data.get(key)?data.get(key):""
    if (isNumber(value)) {
      jsStr = jsStr.replace(`{${key}}`, value.toString());
    } else if (isMathStr) {
      jsStr = jsStr.replace(`{${key}}`, `"${value}"`);
    } else {
      jsStr = jsStr.replace(`{${key}}`, value);
    }
  });
  /**如果包含数学函数 */
  if (isMathStr) {
    try {
      let res = eval(jsStr);
      return res;
    } catch (error) {
      return '公式有错误,请修改！';
    }
  }
  return jsStr;
}
