// 手机号验证（国内）
export const validatePhone = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入手机号'));
    } else {
        const reg = /^1(0|2|3|4|5|6|7|8|9)\d{9}$/;
        if (!(reg.test(value))) {
            callback(new Error('手机号格式不对'));
        } else {
            callback()
        }
    }
};

// 验证手机号（国际包含中国）
export const validatePhoneAll = (value) => {
    const reg = /^(86-)(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[0-9]|19[0-9])[0-9]{8}$|^(886-)(9)\d{8}$|^(82-)(019|017|011|010)\d{8}$/
    if (!(reg.test(value))) {
        return false
    } else {
        return true
    }
};

// 验证邮箱
export const validateEmail = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入邮箱'));
    } else {
        const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (!(reg.test(value))) {
            callback(new Error('邮箱格式错误'));
        } else {
            callback()
        }
    }
};

// 密码验证
export const validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入密码'));
    } else {
        const reg = /^(?![A-Za-z]+$)(?!\d+$)(?![\W_]+$)(?![\u4e00-\u9fa5]+)\S+$/;
        const len = value.split('').length
        if (len < 6 || len > 15) {
            callback(new Error('密码长度在 6 到 15 个字符'));
        } else if (!(reg.test(value))) {
            callback(new Error('密码包含字母、数字和标点符号中至少2种'));
        } else {
            callback()
        }
    }
};
//验证码格式验证
export const validateVerCode = (rule, value, callback) => {
    if (value === null || value === '') {
        callback(new Error('请输入验证码'));
    }else{
        const len = value.split('').length
        const reg = /\d{6}/;
        if(len != 6){
            callback(new Error('验证码是6位数字'));
        }else if(!reg.test(value)){
            callback(new Error('验证码只能是数字'));
        }else{
            callback();
        }
    }
}
// 确认密码验证
export const validatePassConfirm = (rule, value, callback) => {
    console.log(rule);
    console.log(value);
    console.log(callback);
    console.log(target);
    if (value === '') {
        callback(new Error('请再次输入密码'));
    } else {
        callback();
    }
};

// 阅读并同意《平台服务条款》
export const validateAgree = (rule, value, callback) => {
    if (!value) {
        callback(new Error('请阅读并同意《平台服务条款》'));
    } else {
        callback();
    }
};

