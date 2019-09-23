import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { Loading } from '@components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/home'
import { dispatchCartNum } from '@actions/cart'
import { getWindowHeight } from '@utils/style'
import Banner from './banner'
import Policy from './policy'
import Pin from './pin'
import './index.scss'

const RECOMMEND_SIZE = 20

@connect(state => state.home, { ...actions, dispatchCartNum })
class Index extends Component {
  config = {
    navigationBarTitleText: '纤尊秀'
  }

  state = {
    loaded: false,
    loading: false,
    lastItemId: 0,
    hasMore: true
  }

  componentDidMount() {

    this.props.dispatchHome().then(() => {
      this.setState({ loaded: true })
    })
    this.props.dispatchCartNum()
    // this.props.dispatchSearchCount()
    this.props.dispatchPin({ orderType: 4, size: 12 })
    // this.loadRecommend()
  }

  // loadRecommend = () => {
  //   if (!this.state.hasMore || this.state.loading) {
  //     return
  //   }
  //
  //   const payload = {
  //     lastItemId: this.state.lastItemId,
  //     size: RECOMMEND_SIZE
  //   }
  //   this.setState({ loading: true })
  //   this.props.dispatchRecommend(payload).then((res) => {
  //     const lastItem = res.rcmdItemList[res.rcmdItemList.length - 1]
  //     this.setState({
  //       loading: false,
  //       hasMore: res.hasMore,
  //       lastItemId: lastItem && lastItem.id
  //     })
  //   }).catch(() => {
  //     this.setState({ loading: false })
  //   })
  // }

  handlePrevent = () => {
    // XXX 时间关系，首页只实现底部推荐商品的点击
    Taro.showToast({
      title: '目前只可点击底部推荐商品',
      icon: 'none'
    })
  }

  render () {
    if (!this.state.loaded) {
      return <Loading />
    }

    const { homeInfo, pin } = this.props
    return (
      <View className='home'>
        <ScrollView
          scrollY
          className='home__wrap'
          onScrollToLower={this.loadRecommend}
          style={{ height: getWindowHeight() }}
        >
          <View onClick={this.handlePrevent}>
            <Banner list={homeInfo.focus} />
            <Policy list={homeInfo.policyDesc} />

            {/* 免费拼团 */}
            <Pin
              banner={homeInfo.newUserExclusive}
              list={pin}
            />

            {/* 不知道叫啥 */}
            {/* <Operation
              list={homeInfo.operationCfg}
              sale={homeInfo.saleCenter}
            /> */}

            {/* 品牌制造 */}
            {/* <Manufactory
              data={homeInfo.manufactory}
              boss={homeInfo.dingBossRcmd}
            /> */}

            {/* 限时购 */}
            {/* <FlashSale data={homeInfo.flashSale} /> */}

            {/* 人气推荐 */}
            {/* <Popular data={homeInfo.popularItems} /> */}

            {/* 类目热销榜 */}
            {/* <Category data={homeInfo.hotCategory} /> */}
          </View>

          {/* 为你推荐 */}
          {/*<Recommend list={recommend} />*/}

          {this.state.loading &&
          <View className='home__loading'>
            <Text className='home__loading-txt'>正在加载中...</Text>
          </View>
          }
          {!this.state.hasMore &&
          <View className='home__loading home__loading--not-more'>
            <Text className='home__loading-txt'>更多内容，敬请期待</Text>
          </View>
          }
        </ScrollView>
      </View>
    )
  }
}

export default Index
