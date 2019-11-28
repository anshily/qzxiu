import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import './order.scss'
import {AtSteps, AtDivider, AtList, AtListItem} from 'taro-ui'
import * as actions from '@actions/order';

@connect(state => state.order, actions)
export default class Order extends Component {

  constructor(props) {
    super(props)
    this.state = {
      current: 0
    }
  }

  componentDidMount() {
    console.log(this.props);
    this.props.dispatchOrderSet({shopid: Taro.getStorageSync('shopId'), statu: 1}).then((res) => {
      console.log(res)
      this.setState({loaded: true})
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
    }
    if (current == 1) {
      status = 2
    }
    if (current == 2) {
      status = 0
    }
    this.setState({
      current
    })
    Taro.showLoading()
    this.props.dispatchOrderSet({shopid: Taro.getStorageSync('shopId'), statu: status}).then((res) => {
      console.log(res)
      Taro.hideLoading()
      this.setState({loaded: true})
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
    return (
      <View>
        {/*<View className='at-row at-row__align--center'>*/}
          {/*<View style='height:100px' className='at-col'>*/}
            {/*<AtSteps*/}
              {/*items={items}*/}
              {/*current={this.state.current}*/}
              {/*onChange={this.onChange.bind(this)}*/}
            {/*/>*/}
          {/*</View>*/}
        {/*</View>*/}

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

        <View>
          <AtList>
            {
              this.props.orderList.map(item => (
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

        {!(this.props.orderList.length > 0) && <AtDivider content='暂无订单'/>}
      </View>
    )
  }
}
