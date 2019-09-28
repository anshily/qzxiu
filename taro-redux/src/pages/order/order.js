
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './order.scss'
import * as actions from '@actions/order';

@connect(state => state.orderItem, actions)
export default class Order extends Component {
  config = {
    navigationBarTitleText: 'order'
  }
  render() {
    return(
      <View>
        <Text>
          order
        </Text>
      </View>
    )
  }
}
