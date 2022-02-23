const hasMathStr = (str: string): boolean => {
    const strReg = /(sum|max|min|average|floor|divide|ceil|multiply|round|sub|condition)/g;
    return strReg.test(str);
};

export default hasMathStr