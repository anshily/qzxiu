import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import jump from '@utils/jump'
import classNames from 'classnames'
import './index.scss'

const MENU_LIST = [{
  key: 'order',
  text: '我的订单',
  img: require('./assets/order.png')
}, {
  key: 'add-shop',
  text: '添加商铺',
  img: require('./assets/pin.png')
}, {
  key: 'referrer',
  text: '客户关系',
  img: require('./assets/bargain.png')
},
//   {
//   key: 'credit',
//   text: '我的积分',
//   img: require('./assets/credit.png')
// }, {
//   key: 'service',
//   text: '退换/售后',
//   img: require('./assets/service.png')
// }, {
//   key: 'coupon',
//   text: '优惠券',
//   img: require('./assets/coupon.png')
// }, {
//   key: 'red-packet',
//   text: '红包',
//   img: require('./assets/red-packet.png')
// },
{
  key: 'allowance',
  text: '提现管理',
  img: require('./assets/allowance.png')
},
// {
//   key: 'gif-card',
//   text: '礼品卡',
//   img: require('./assets/gif-card.png')
// }, {
//   key: 'location',
//   text: '地址管理',
//   img: require('./assets/location.png')
// }, {
//   key: 'safe',
//   text: '账号安全',
//   img: require('./assets/safe.png')
// }, {
//   key: 'contact',
//   text: '联系客服',
//   img: require('./assets/contact.png')
// }, {
//   key: 'feedback',
//   text: '用户反馈',
//   img: require('./assets/feedback.png')
// },
  {
  key: 'message',
  text: '消息中心',
  url: 'http://m.you.163.com/help',
  img: require('./assets/help.png')
}]
const COUNT_LINE = 3

export default class Menu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      menus: []
    }
  }
  componentWillMount() {
    const userRole = Taro.getStorageSync('user_role')
    if (userRole) {
      if (userRole == '普通店铺') {
        this.setState({
          menus: [{
            key: 'order',
            text: '我的订单',
            img: require('./assets/order.png')
          }, {
            key: 'referrer',
            text: '客户关系',
            img: require('./assets/bargain.png')
          }, {
            key: 'message',
            text: '消息中心',
            url: 'http://m.you.163.com/help',
            img: require('./assets/help.png')
          }]
        })
      }else if (userRole == '总店管理员'){
        this.setState({
          menus: [{
            key: 'add-shop',
            text: '添加商铺',
            img: require('./assets/pin.png')
          }, {
            key: 'allowance',
            text: '提现管理',
            img: require('./assets/allowance.png')
          },{
            key: 'order',
            text: '我的订单',
            img: require('./assets/order.png')
          }, {
            key: 'referrer',
            text: '客户关系',
            img: require('./assets/bargain.png')
          }, {
            key: 'message',
            text: '消息中心',
            url: 'http://m.you.163.com/help',
            img: require('./assets/help.png')
          }]
        })
      } else if (userRole == '开发'){

      }
    }
  }
  handleClick = (menu) => {
    // NOTE 时间关系，此处只实现帮助中心，用于演示多端 webview
    if (menu.key === 'help') {
      jump({ url: menu.url, title: menu.text })
    } else if (menu.key === 'add-shop') {
      Taro.navigateTo({
        url: '/pages/enter/enter'
      })
    } else if (menu.key === 'referrer') {
      Taro.navigateTo({
        url: '/pages/referrer/referrer'
      })
    }else if (menu.key === 'order') {
      Taro.navigateTo({
        url: '/pages/order/order'
      })
    }else if (menu.key === 'allowance') {
      Taro.navigateTo({
        url: '/pages/allowance/allowance'
      })
    } else if (menu.key === 'message') {
      Taro.navigateTo({
        url: '/pages/message/message'
      })
    } else {
      Taro.showToast({
        title: '目前只实现了帮助中心~',
        icon: 'none'
      })
    }
  }

  render () {
    const {menus} = this.state
    return (
      <View className='user-menu'>
        {menus.map((menu, index) => {
          // NOTE 不用伪元素选择器，需自行计算
          const nth = (index + 1) % COUNT_LINE === 0
          const lastLine = parseInt(index / COUNT_LINE) === parseInt(menus.length / COUNT_LINE)
          return (
            <View
              key={menu.key}
              className={classNames(
                'user-menu__item',
                nth && 'user-menu__item--nth',
                lastLine && 'user-menu__item--last',
              )}
              onClick={this.handleClick.bind(this, menu)}
            >
              <Image className='user-menu__item-img' src={menu.img} />
              <Text className='user-menu__item-txt'>{menu.text}</Text>
            </View>
          )
        })}
      </View>
    )
  }
}
