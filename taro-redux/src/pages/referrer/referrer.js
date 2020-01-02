import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import {AtSteps, AtAccordion, AtList, AtListItem} from 'taro-ui'
import './referrer.scss'
import * as actions from '@actions/referrer';
import {ClCard} from 'mp-colorui'

@connect(state => state.referrer, actions)
export default class Referrer extends Component {

  static defaultProps = {
    referrerLevelOne: [],
    referrerLevelTwo: [],
    referrerShopItem: {
      cashin: 0,
      cashout: 0
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      open1: true,
      open2: true
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
      url: '/pages/referrer/referrer?shopId=' + item['id'] + '&levelType=' + type
    })
  }

  onChange(current) {
    console.log(current)
    this.setState({
      current
    })
  }

  handleClick1(value) {
    this.setState({
      open1: value
    })
  }

  handleClick2(value) {
    this.setState({
      open2: value
    })
  }

  config = {
    navigationBarTitleText: '客户关系'
  }

  render() {
    const items = [
      {'title': '步骤一', 'desc': '这里是额外的信息，最多两行'},
      {'title': '一级店铺', 'desc': '这里是额外的信息，最多两行'},
      {'title': '步骤三', 'desc': '这里是额外的信息，最多两行'}
    ]

    const {referrerLevelOne, referrerLevelTwo, referrerShopItem} = this.props
    console.log(referrerShopItem)
    return (
      <View className='home__wrap'>

        <AtList>
          <AtListItem title='奖励金额' note={referrerShopItem.cashin + ' 元'}
                      thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
          />
          <AtListItem title='已提现' note={referrerShopItem.cashout + ' 元'}
                      thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
          />
          {/*<AtListItem title='已提现' note={referrerShopItem.cashin} />*/}
        </AtList>

        {/*<ClCard type='full'>*/}
          {/*<View className='at-row'>*/}
            {/*<View className='at-col at-col-6'>*/}



              {/*/!*<View className='at-row'>*!/*/}
                {/*/!*<View className='at-col at-col-6'>*!/*/}
                  {/*/!*当前余额 0 元*!/*/}
                {/*/!*</View>*!/*/}
              {/*/!*</View>*!/*/}
              {/*/!*<View className='at-row'>*!/*/}
                {/*/!*累计推荐 0 人 奖励 0 元*!/*/}
              {/*/!*</View>*!/*/}
              {/*/!*<View className='at-row'>*!/*/}
                {/*/!*提现详情*!/*/}
              {/*/!*</View>*!/*/}

            {/*</View>*/}

            {/*<View className='at-col at-col-10'>*/}

            {/*</View>*/}
          {/*</View>*/}
        {/*</ClCard>*/}


        <AtAccordion
          open={this.state.open1}
          onClick={this.handleClick1.bind(this)}
          title='我管理的'
        >
          <AtList hasBorder={false}>
            {
              referrerLevelOne.map(item => (
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
        </AtAccordion><AtAccordion
          open={this.state.open2}
          onClick={this.handleClick2.bind(this)}
          title='我推荐的'
        >
          <AtList hasBorder={false}>
            {
              referrerLevelTwo.map(item => (
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
        </AtAccordion>
      </View>
    )
  }
}
