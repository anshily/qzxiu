
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './order-detail.scss'
import * as actions from '@actions/order-detail';

@connect(state => state.orderDetail, actions)
export default class OrderDetail extends Component {
  config = {
    navigationBarTitleText: 'order-detail'
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
    return(
      <View>
        <Text>
          order-detail
        </Text>
      </View>
    )
  }
}
