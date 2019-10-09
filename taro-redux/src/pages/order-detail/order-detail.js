
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { CheckboxItem, InputNumber } from '@components'
import { connect } from '@tarojs/redux'
import './order-detail.scss'
import * as actions from '@actions/order-detail';
import {IMG_URL} from "@constants/api";
import { AtDivider } from 'taro-ui'

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
    this.orderId = parseInt(this.$router.params.orderId)
  }

  componentDidMount() {
    this.props.dispatchOrderDetail({
      orderid: this.orderId
    })
  }
  render() {
    let list = [{
      id: 1,
      pic: IMG_URL + '../uploads/assets/index1.jpg',
      itemName: 'test',
      actualPrice: 10,
      cnt: 2
    },{
      id: 2,
      pic: IMG_URL + '../uploads/assets/index1.jpg',
      itemName: 'test',
      actualPrice: 10,
      cnt: 2
    }];
    return(
      <View className='cart-list'>
        {list.map(item => (
          <View
            key={item.id}
            className='cart-list__item'
          >
            {/*<CheckboxItem*/}
              {/*checked={item.checked}*/}
              {/*onClick={this.handleUpdateCheck.bind(this, item)}*/}
            {/*/>*/}
            <Image
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

          <AtDivider />
          <View className='at-row'>
            <View className='at-col at-col-3'>A</View>
            <View className='at-col at-col-6'>B</View>
            <View className='at-col at-col-2'>C</View>
            <View className='at-col at-col-1'>D</View>
          </View>

        </View>
      </View>
    )
  }
}
