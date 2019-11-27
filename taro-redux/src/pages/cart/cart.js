import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { ButtonItem, ItemList, Loading } from '@components'
import {AtDivider, AtButton} from 'taro-ui'
import {ClCard} from 'mp-colorui'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/cart'
import { API_CHECK_LOGIN } from '@constants/api'
import fetch from '@utils/request'
import { getWindowHeight } from '@utils/style'
import * as cartUtil from '@utils/cart'
import { dispatchOrder } from '@actions/order'
import Empty from './empty'
import List from './list'
import Footer from './footer'
import './cart.scss'

@connect(state => state.cart, {actions, dispatchOrder})
class Index extends Component {
  config = {
    navigationBarTitleText: '购物车'
  }

  state = {
    loaded: false,
    login: false,
    cartInfo: {},
    cartList: []
  }

  componentDidShow() {

    fetch({ url: API_CHECK_LOGIN, showToast: false, autoLogin: false }).then((res) => {
      if (res) {
        this.setState({ loaded: true, login: true })
        this.props.dispatchCart()
        this.props.dispatchCartNum()
        this.props.dispatchRecommend()
      } else {
        this.setState({ loaded: true, login: false })
      }
    })
    let carts = cartUtil.getCart();

    let price = 0;
    carts.forEach(item => {
      if (item.check){
        price += item.actualPrice
      }
    })

    this.setState({
      cartList: carts,
      cartInfo: {
        actualPrice: price
      }
    })
  }

  updateCartInfo() {
    let list = cartUtil.getCart();
    let price = 0;
    let cnt = 0;
    list.forEach(item => {
      if (item.checked){
        price += item.actualPrice * item.cnt;
        cnt++;
      }
    })

    let payload = {
      cartInfo: {
        actualPrice: price,
        selectedCount: cnt
      }
    }
    this.setState(payload);
  }

  updateCart = (item) => {
    cartUtil.updateCart(item);
    this.setState({
      cartList: cartUtil.getCart()
    })
    this.updateCartInfo();
  }

  allChecked = (order) => {
    // console.log(order)
    //
    // let price = 0;
    // let cnt = 0;
    // order.forEach(item => {
    //   if (item.checked){
    //     price += item.actualPrice;
    //     cnt++;
    //   }
    // })

    cartUtil.setCart(order)

    let payload = {
      cartList: order
    }
    this.setState(payload);

    this.updateCartInfo();

    console.log(this.state)
  }

  addOrder = (item) => {
    console.log(item);

    let list = cartUtil.getCart();

    let orders = [];

    list.forEach( o => {
      if (o.checked){
        orders.push({
          goodsId: o.id,
          goodsNum: o.cnt,
          goodsPrice: o.actualPrice
        })
      }
    })

    const payload = {
      shopId:Taro.getStorageSync('shopId'),
      list: orders,
      token: Taro.getStorageSync('user_token')
    }
    this.props.dispatchOrder(payload).then(res => {
      console.log(res)
      Taro.showToast({
        title: '加入下单成功',
        icon: 'none'
      })
      cartUtil.setCart([]);
      this.setState({
        cartList: cartUtil.getCart()
      })
    }).catch(err => {
      console.log(err);
      Taro.showToast({
        title: '网络错误',
        icon: 'none'
      })
    })
  }

  // updateCheck = (item) => {
  //   cartUtil.updateCart(item);
  //   this.setState({
  //     cartList: cartUtil.getCart()
  //   })
  // }

  toLogin = () => {
    Taro.navigateTo({
      url: '/pages/user-login/user-login'
    })
  }

  clearCart = () => {
    cartUtil.setCart([])
    this.setState({
      cartList: cartUtil.getCart()
    })
  }

  render () {
    const cartList = this.state.cartList;
    const isEmpty = !cartList.length
    const isShowFooter = !isEmpty

    // if (!this.state.loaded) {
    //   return <Loading />
    // }

    // if (!this.state.login) {
    //   return (
    //     <View className='cart cart--not-login'>
    //       <Empty text='未登陆' />
    //       <View className='cart__login'>
    //         <ButtonItem
    //           type='primary'
    //           text='登录'
    //           onClick={this.toLogin}
    //           compStyle={{
    //             background: '#b59f7b',
    //             borderRadius: Taro.pxTransform(4)
    //           }}
    //         />
    //       </View>
    //     </View>
    //   )
    // }

    return (
      <View className='cart'>
        <ScrollView
          scrollY
          className='cart__wrap'
          style={{ height: getWindowHeight() }}
        >
          {/*<Tip list={cartInfo.policyDescList} />*/}
          {isEmpty && <Empty />}

          {/*{!isEmpty && <Gift data={cartGroupList[0]} />}*/}

          {!isEmpty &&
          <List
            key={`1`}
            promId={'2'}
            promType={'2'}
            list={cartList}
            onUpdate={this.updateCart}
            onUpdateCheck={this.updateCart}
          />}

          {!isEmpty && <ClCard type='full'>
                    <AtDivider/>

                    <View className='at-row at-row__justify--end'>
                      <View className='at-col'></View>
                      <View className='at-col at-col-3'>
                        <AtButton type='secondary' size='small'
                                  onClick={this.clearCart}>清除</AtButton>
                      </View>
                    </View>
                    </ClCard>
          }

          {/* 相关推荐 */}
          {/*{extList.map((ext, index) => (*/}
            {/*<ItemList key={`${ext.id}_${index}`} list={ext.itemList}>*/}
              {/*<View className='cart__ext'>*/}
                {/*{!!ext.picUrl && <Image className='cart__ext-img' src={ext.picUrl} />}*/}
                {/*<Text className='cart__ext-txt'>{ext.desc}</Text>*/}
              {/*</View>*/}
            {/*</ItemList>*/}
          {/*))}*/}

          {/* 猜你喜欢 */}
          {/*<ItemList list={recommend.itemList}>*/}
            {/*<View className='cart__recommend'>*/}
              {/*<Text className='cart__recommend-txt'>{recommend.desc}</Text>*/}
            {/*</View>*/}
          {/*</ItemList>*/}

          {isShowFooter &&
            <View className='cart__footer--placeholder' />
          }
        </ScrollView>

        {isShowFooter &&
          <View className='cart__footer'>
            <Footer
              list={cartList}
              cartInfo={this.state.cartInfo}
              onUpdateCheck={this.allChecked}
              onAddOrder={this.addOrder}
            />
          </View>
        }
      </View>
    )
  }
}

export default Index
