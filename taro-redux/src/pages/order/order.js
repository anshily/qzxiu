import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import './order.scss'
import {AtSteps, AtDivider, AtList, AtListItem, AtLoadMore} from 'taro-ui'
import * as actions from '@actions/order';

@connect(state => state.order, actions)
export default class Order extends Component {

  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      status: 'noMore',
      orderListCancel: [],
      orderListFinish: [],
      orderListCurrent: []
    }
  }

  componentDidMount() {
    console.log(this.props);
    Taro.showLoading({
      title: '加载中...'
    })
    this.props.dispatchOrderSet({shopid: Taro.getStorageSync('shopId'), statu: 1}).then((res) => {
      this.setState({
        orderListCurrent: res
      })
      Taro.hideLoading()
    })
  }

  handleClick(item) {
    console.log(item)
    Taro.navigateTo({
      url: `/pages/order-detail/order-detail?orderId=${item.orderid}&statu=${item.statu}`
    })
  }

  config = {
    navigationBarTitleText: '订单'
  }

  onChange(current) {
    console.log(current)
    let status = current;
    if (current == 0) {
      status = 1
      Taro.showLoading({
        title: '加载中...'
      })
    this.props.dispatchOrderSet({shopid: Taro.getStorageSync('shopId'), statu: status}).then((res) => {
      console.log(res)
      this.setState({
        orderListCurrent: res
      })
      Taro.hideLoading()
    })
    }
    if (current == 1) {
      status = 2
      Taro.showLoading({
        title: '加载中...'
      })
    this.props.dispatchOrderSet({shopid: Taro.getStorageSync('shopId'), statu: status}).then((res) => {
      console.log(res)
      this.setState({
        orderListFinish: res
      })
      Taro.hideLoading()
    })
    }
    if (current == 2) {
      status = 0
      Taro.showLoading({
        title: '加载中...'
      })
    this.props.dispatchOrderSet({shopid: Taro.getStorageSync('shopId'), statu: status}).then((res) => {
      console.log(res)
      this.setState({
        orderListCancel: res
      })
      Taro.hideLoading()
    })
    }
    this.setState({
      current
    })

  }

  render() {
    const items = [
      {
        'title': '已下单',
        // 'desc': '这里是额外的信息，最多两行'
      },
      {
        'title': '已完成',
        // 'desc': '这里是额外的信息，最多两行'
      },
      {
        'title': '已取消',
        // 'desc': '这里是额外的信息，最多两行'
      }
    ]
    const {orderList} = this.props;
    console.log(orderList)
    return (
      <View>

        <View className='at-row at-row__justify--center'>
          <View className='at-col at-col-10'>

            <View  style='height:100px' className='at-row at-row__align--center'>
              <View className='at-col'>
                <AtSteps
                  items={items}
                  current={this.state.current}
                  onChange={this.onChange.bind(this)}
                />
              </View>
            </View>
          </View>
        </View>
        {this.state.current == 0 &&
        <View>
            <View>
            <AtList>
              {
                this.state.orderListCurrent.map(item => (
                  <AtListItem
                    onClick={this.handleClick.bind(this, item)}
                    key={String(item.id)}
                    arrow='right'
                    note={'总价：' + item.priceall}
                    title={'订单编号：' + item.orderid}
                    extraText='详细信息'
                  />
                ))
              }
            </AtList>
            </View>
            <View>
              {!(this.state.orderListCurrent.length > 0) && <AtLoadMore
                status={this.state.status}
              />}
            </View>
        </View>
        }

{this.state.current == 1 &&
        <View>
            <View>
            <AtList>
              {
                this.state.orderListFinish.map(item => (
                  <AtListItem
                    onClick={this.handleClick.bind(this, item)}
                    key={String(item.id)}
                    arrow='right'
                    note={'总价：' + item.priceall}
                    title={'订单编号：' + item.orderid}
                    extraText='详细信息'
                  />
                ))
              }
            </AtList>
            </View>
            <View>
              {!(this.state.orderListFinish.length > 0) && <AtLoadMore
                status={this.state.status}
              />}
            </View>
        </View>
        }

{this.state.current == 2 &&
        <View>
            <View>
            <AtList>
              {
                this.state.orderListCancel.map(item => (
                  <AtListItem
                    onClick={this.handleClick.bind(this, item)}
                    key={String(item.id)}
                    arrow='right'
                    note={'总价：' + item.priceall}
                    title={'订单编号：' + item.orderid}
                    extraText='详细信息'
                  />
                ))
              }
            </AtList>
            </View>
            <View>
              {!(this.state.orderListCancel.length > 0) && <AtLoadMore
                status={this.state.status}
              />}
            </View>
        </View>
        }
      </View>
    )
  }
}
