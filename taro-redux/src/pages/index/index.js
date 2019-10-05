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
import { AtFab, AtActionSheet, AtActionSheetItem } from 'taro-ui'
import { ClFloatButton } from 'mp-colorui'
import {IMG_URL} from "../../constants/api";

//引入图片预加载组件
import ImgLoader from '@utils/img-loader/img-loader'

const RECOMMEND_SIZE = 20

function genImgListData() {
  let images = [
    IMG_URL + '../uploads/assets/index1.jpg',
    IMG_URL + '../uploads/assets/index2.jpg',
    IMG_URL + '../uploads/assets/index3.jpg',
    IMG_URL + '../uploads/assets/index4.jpg'
  ]
  return images.map(item => {
    return {
      url: item,
      loaded: false
    }
  })
}

@connect(state => state.home, { ...actions, dispatchCartNum })
class Index extends Component {
  config = {
    navigationBarTitleText: '纤尊秀'
  }

  state = {
    loaded: false,
    loading: false,
    lastItemId: 0,
    hasMore: true,
    isOpen: false,
    imgList: genImgListData(),
    imgLoadList: []
  }

  onButtonClick() {
    this.setState({
      isOpen: true
    })
  }

  componentDidMount() {

    // this.props.dispatchHome().then(() => {
    //   this.setState({ loaded: true })
    // })
    this.props.dispatchBanner().then((res) => {
      console.log(res)
      this.setState({ loaded: true })
    })
    // this.props.dispatchCartNum()
    // this.props.dispatchSearchCount()
    this.props.dispatchPin({ orderType: 4, size: 12 })
    this.loadImages();
    // this.loadRecommend()
  }

  componentWillMount() {
    //初始化图片预加载组件，并指定统一的加载完成回调
    this.imgLoader = new ImgLoader(this, this.imageOnLoad.bind(this))
  }

  loadImages = () => {
    //同时发起全部图片的加载
    this.state.imgList.forEach(item => {
      this.imgLoader.load(item.url)
    })
  }

  imageOnLoad = (err, data) => {
    console.log('图片加载完成', err, data.src)

    const imgList = this.state.imgList.map(item => {
      if (item.url == data.src) item.loaded = true
      return item
    })
    this.setState({
      imgList
    })
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

    const { imgList, imgLoadList } = this.state

    if (!this.state.loaded) {
      return <Loading />
    }

    const { homeInfo, pin, banner } = this.props
    return (
      <View className='home'>
        <ScrollView
          scrollY
          className='home__wrap'
          style={{ height: getWindowHeight() }}
        >
          <View onClick={this.handlePrevent}>
            <Banner list={banner} />
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

          <View className='img_list'>
            {imgList.map((item, index) => {
              return (
                <View className='img_wrap' key={index}>
                  {item.loaded && <Image src={item.url} className='fade_in' />}
                </View>
              )
            })}
          </View>
          {/*<Button onClick={this.loadImages}>Click To Load Images</Button>*/}
          {/*  引入图片预加载组件  */}
          <Block>
            {imgLoadList.map((item, index) => {
              return (
                <Image
                  key={index}
                  src={item}
                  data-src={item}
                  onLoad={this.imgLoader._imgOnLoad.bind(this.imgLoader)}
                  onError={this.imgLoader._imgOnLoadError.bind(this.imgLoader)}
                  style='width:0;height:0;opacity:0'
                />
              )
            })}
          </Block>

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

          <View className='fab-fixed'>
            <AtFab>
              <Text onClick={this.onButtonClick} className='at-fab__icon at-icon at-icon-add'></Text>
            </AtFab>

          </View>

          <AtActionSheet cancelText='我再看看吧' title='对我们感兴趣？' isOpened={this.state.isOpen}>
            <AtActionSheetItem>
              咨询
            </AtActionSheetItem>
            <AtActionSheetItem>
              加盟
            </AtActionSheetItem>
          </AtActionSheet>

        </ScrollView>
      </View>
    )
  }
}

export default Index
