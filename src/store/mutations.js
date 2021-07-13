export const setUserInfo = (state, userInfo) => { // A组件点击更改餐馆名称为 A餐馆
    state.userInfo = userInfo // 把方法传递过来的参数，赋值给state中的resturantName
}