
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import {AtCard, AtAccordion, AtList, AtListItem} from 'taro-ui'
import './referrer-level-two.scss'
import * as actions from '@actions/referrer-level-two';

@connect(state => state.referrerLevelTwo, actions)
export default class ReferrerLevelTwo extends Component {
  config = {
    navigationBarTitleText: '客户关系'
  }

  static defaultProps = {
    referrerOne: [],
    referrerTwo: [],
    referrerShopItem: {
      cashin: 0,
      cashout: 0
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      current: 0
    }
    this.shopId = parseInt(this.$router.params.shopId)
    this.levelType = this.$router.params.levelType
  }

  componentDidMount() {

    console.log(this.levelType ? this.levelType  : this.levelType = 1);


    Taro.showLoading({
      title: '加载中...'
    })
    this.props.dispatchChild({shopid: this.shopId ? this.shopId : Taro.getStorageSync('shopId')}).then((res) => {
      console.log(res)
      // this.setState({ loaded: true })
    })

    this.props.dispatchCashInfo({id: this.shopId ? this.shopId : Taro.getStorageSync('shopId')}).then((res) => {
      console.log(res)
      Taro.hideLoading()
      // this.setState({ loaded: true })
    })
  }

  goDetail(item) {
    console.log(item)
    let type = parseInt(this.levelType) + 1
    Taro.navigateTo({
      url: '/pages/referrer-level-two/referrer-level-two?shopId=' + item['id']
    })
  }

  goOrder(id) {
    console.log(id)
    Taro.navigateTo({
      url: '/pages/order/order?shopId=' + id
    })
  }

  onChange(current) {
    console.log(current)
    this.setState({
      current
    })
  }

  render() {

    const {referrerOne, referrerTwo, referrerShopItem} = this.props
    console.log(referrerShopItem)
    return (
      <View className='home__wrap'>

        <AtList>
          <AtListItem title='店铺名' note={referrerShopItem.shopname}
                      thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
          />
          <AtListItem title='店主' note={referrerShopItem.username}
                      thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
          />
          <AtListItem title='奖励金额' note={referrerShopItem.cashin + ' 元'}
                      thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
          />
          <AtListItem title='已提现' note={referrerShopItem.cashout + ' 元'}
                      thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
          />

          <AtListItem
            onClick={this.goOrder.bind(this,referrerShopItem.id)}
            title='订单状况'
            extraText='详细信息'
            arrow='right'
            thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
          />
          {/*<AtListItem title='已提现' note={referrerShopItem.cashin} />*/}
        </AtList>

        <View className="doc-header">
          <View className="doc-header__title">管理的店铺</View>
        </View>

        <AtList hasBorder={false}>
          {
            referrerOne.map(item => (
              <AtListItem
                onClick={this.goDetail.bind(this,item)}
                key={String(item.id)}
                title={item.shopname + '--' + item.username}
                note='描述信息'
                extraText='详细信息'
                arrow='right'
                thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
              />
            ))
          }

        </AtList>

        <View className="doc-header">
          <View className="doc-header__title">推荐的店铺</View>
        </View>

        <AtList hasBorder={false}>
          {
            referrerTwo.map(item => (
              <AtListItem
                key={String(item.id)}
                title={item.shopname}
                note='描述信息'
                extraText='详细信息'
                arrow='right'
                thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
              />
            ))
          }
        </AtList>

        {/*<View className="doc-header">*/}
          {/*<View className="doc-header__title">店铺订单</View>*/}
        {/*</View>*/}

      </View>
    )
  }
}
