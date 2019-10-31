import Taro from '@tarojs/taro'
import {ROOT_URL} from '@constants/api';

export default async  function authReload() {
  return Taro.login().then(async (res) => {
    console.log(1);
    return Taro.request({
      url: ROOT_URL + 'user/accordingCodeGetToken',
      method: 'GET',
      data: {
        code: res['code']
      }
    }).then(async (info) => {
      console.log(2);
        console.log(info)
        let data = info['data']
        if (data['code'] == 0){
          return Promise.all([
          Taro.setStorage({ key: 'user_token', data: data['data']['token']}),
          Taro.setStorage({ key: 'user_role', data: data['data']['rolename']}),
          Taro.setStorage({ key: 'user_id', data: data['data']['id']}),
          getShop(data['data']['token'])
          ])
        }
      }
    )
  })
}

async function getShop(token) {
  console.log(3);
  return Taro.request({
    url: ROOT_URL + 'user/accordingTokenGetShop',
    method: 'GET',
    data: {
      token: token
    }
  }).then(async res => {
    console.log(res);
    console.log(4);
    let data = res['data'];
    if (data['code'] == 0 && data['data']){
      // Taro.setStorageSync('shopInfo',data['data']);
      // Taro.setStorageSync('shopId',data['data']['id']);

      return Promise.all([
        Taro.setStorage({ key: 'shopInfo', data: data['data'] }),
        Taro.setStorage({ key: 'shopId', data: data['data']['id']})
        // Taro.setStorage({ key: 'cart', data: data['cart'] || JSON.stringify({})})
      ])
    }
  })
}

function urlStringify(url, payload, encode = true) {
  const arr = Object.keys(payload).map(key =>
    `${key}=${encode ? encodeURIComponent(payload[key]) : payload[key]}`
  )

  // NOTE 注意支付宝小程序跳转链接如果没有参数，就不要带上 ?，否则可能无法跳转
  return arr.length ? `${url}?${arr.join('&')}` : url
}
