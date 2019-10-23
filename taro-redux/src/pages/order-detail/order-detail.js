
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { InputNumber } from '@components'
import { connect } from '@tarojs/redux'
import './order-detail.scss'
import * as actions from '@actions/order-detail';
import {IMG_URL} from "@constants/api";
import { AtDivider, AtButton  } from 'taro-ui'
import {ClCard} from 'mp-colorui'

@connect(state => state.orderDetail, actions)
export default class OrderDetail extends Component {
  config = {
    navigationBarTitleText: '订单详情'
  }

  static defaultProps = {
    orderDetail: {}
  }

  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
    // this.orderId = parseInt(this.$router.params.orderId)
    this.orderId = this.$router.params.orderId
  }

  componentDidMount() {
    this.props.dispatchOrderDetail({
      orderid: this.orderId
    })
  }
  render() {

    let  {orderDetail} = this.props;
    return(
      <View className='cart-list'>
        {orderDetail &&  orderDetail.list && orderDetail.list.map(item => (
          <View
            key={item.id}
            className='cart-list__item'
          >
            {/*<CheckboxItem*/}
              {/*checked={item.checked}*/}
              {/*onClick={this.handleUpdateCheck.bind(this, item)}*/}
            {/*/>*/}
            <Image
              mode='aspectFill'
              className='cart-list__item-img'
              src={item.pic}
            />
            <View className='cart-list__item-info'>
              <View className='cart-list__item-title'>
                {!!item.prefix &&
                <Text className='cart-list__item-title-tag'>{item.prefix}</Text>
                }
                <Text className='cart-list__item-title-name' numberOfLines={1}>
                  {item.itemName}
                </Text>
              </View>

              {/*<View className='cart-list__item-spec'>*/}
              {/*<Text className='cart-list__item-spec-txt'>*/}
              {/*{item.specList.map(sepc => sepc.specValue).join(' ')}*/}
              {/*</Text>*/}
              {/*</View>*/}

              <View className='cart-list__item-wrap'>
                <Text className='cart-list__item-price'>
                  ¥{item.actualPrice}
                </Text>
                <View className='cart-list__item-num'>
                  <InputNumber
                    num={item.cnt}
                    // onChange={this.handleUpdate.bind(this, item)}
                  />
                </View>
              </View>
            </View>
          </View>
        ))}

        {/*<AtDivider />*/}
        <View className='order-bar'>
          <ClCard type='full'>
            <View className='at-row at-row__justify--end'>
              {/*<View className='at-col at-col__offset-4'>总计 1 件商品， 共计 999 元</View>*/}
              <View className='at-col'></View>
              <View className='at-col'>总计 {orderDetail['sumCnt']} 件商品， 共计 {orderDetail['sumPrice']} 元</View>

            </View>

            <AtDivider />

            <View className='at-row at-row__justify--end'>
              <View className='at-col'></View>
              <View className='at-col at-col-3'>
                <AtButton type='secondary' size='small'>取消订单</AtButton>
              </View>
            </View>
          </ClCard>
        </View>

      </View>
    )
  }
}
