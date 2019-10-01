import Taro from '@tarojs/taro'

export function putCart(data = {}) {
  let flag = true;
  let tmp = getCart();
  tmp.map(item => {
    if (item.id == data.id){
      data.cnt += item.cnt;
      flag = false;
      return data;
    }
    return item;
  })

  if (flag) {
    tmp.push(data)
  }
  console.log(tmp);
  Taro.setStorageSync('cart', JSON.stringify(tmp));
}

export function getCart() {
  let tmp = Taro.getStorageSync('cart');
  return tmp && JSON.parse(tmp).length  ? JSON.parse(Taro.getStorageSync('cart')) : [];
}

export function setCart(data) {
  Taro.setStorageSync('cart', JSON.stringify(data));
}

export function updateCart(data = {}) {
  let flag = true;
  let cartList = getCart();
  let tmp = cartList.map(item => {
    if (item.id == data.id){
      flag = false;
      console.log(data)
      return data;
    }
    return item;
  })

  if (flag) {
    tmp.push(data)
  }

  console.log(tmp)
  Taro.setStorageSync('cart', JSON.stringify(tmp));
}
