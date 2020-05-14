import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { Loading, ButtonItem, InputItem } from '@components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/home'
import { dispatchCartNum } from '@actions/cart'
import { getWindowHeight } from '@utils/style'
import Banner from './banner'
import Pin from './pin'
import './index.scss'
import loginBanner from '@assets/login-banner.jpg'
import {AtButton, AtForm, AtInput, AtCurtain, AtFab, AtActionSheet, AtActionSheetItem } from 'taro-ui'
import { ClCard, ClText, ClTitleBar } from "mp-colorui";
import {IMG_URL} from "@constants/api";

//引入图片预加载组件
import ImgLoader from '@utils/img-loader/img-loader'

const RECOMMEND_SIZE = 20

function genImgListData() {
  let images = [
    // IMG_URL + 'uploads/qzx/assets/index1.jpg',
    // IMG_URL + 'uploads/qzx/assets/index2.jpg',
    // IMG_URL + 'uploads/qzx/assets/index3.jpg',
    // IMG_URL + 'uploads/qzx/assets/index4.jpg'
    IMG_URL + 'uploads/qzx/assets/index10.jpg'
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
    navigationBarTitleText: '纤尊秀健康管理',
  }

  state = {
    loaded: false,
    loading: false,
    lastItemId: 0,
    hasMore: true,
    isOpen: false,
    isCurtainOpened: false,
    imgList: genImgListData(),
    imgLoadList: [],
    username: '',
    userPhone: '',
    userAddress: ''
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
    this.props.dispatchGoodShops().then(res => {
      console.log(res)
    })
    this.loadImages();
    // this.loadRecommend()
  }

  componentDidShow(){

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

  contactUs = () => {
    // Taro.navigateTo({
    //   url: '/pages/contact/contact'
    // })

    this.setState({
      isCurtainOpened: true,
      isOpen: false
    })
  }

  handleInput = (key, value) => {
    this.setState({ [key]: value })
  }

  onClose () {
    this.setState({
      isCurtainOpened: false
    })
  }

  callPhone = () => {
    const phoneList = ['15890993809 李勤','18898120362  蒋好']
    Taro.showActionSheet({
      itemList: phoneList,
      success: function (res) {
        console.log(res) //当点击400-900-2250就相当于点击了
        Taro.makePhoneCall({
          phoneNumber: phoneList[res.tapIndex], //此号码并非真实电话号码，仅用于测试
          success: function () {
            console.log("拨打电话成功！")
          },
          fail: function () {
            console.log("拨打电话失败！")
          }
        })
        if (!res.cancel) {
          console.log(res.tapIndex)//console出了下标
        }
      }
    });
    // Taro.makePhoneCall({
    //   phoneNumber: '15239933620', //此号码并非真实电话号码，仅用于测试
    //   success: function () {
    //     console.log("拨打电话成功！")
    //   },
    //   fail: function () {
    //     console.log("拨打电话失败！")
    //   }
    // })
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

  onSubmit = () => {
    this.setState({
      loading: true,
      disabled: true
    })
    console.log('submit')
    let params = {
      name: this.state.username,
      phone: this.state.userPhone,
      address: this.state.userAddress
    }
    this.props.dispatchContact(params).then(res => {
      console.log(res)
      Taro.showModal({
        title: '提示',
        content: '提交成功',
        showCancel: false,
        success: (res) => {
          if (res.confirm) {
            // Taro.navigateBack()

            this.setState({
              isCurtainOpened: false
            })
          }
        }
      });
    }).finally( () => {
      this.setState({
        loading: false,
        disabled: false
      })
    })
  }

  handleGoodShopClick = (item) => {
    console.log(item)
    Taro.navigateTo({
      url: `/pages/shop/shop?shopId=${item.id}`
    })
  }

  render () {

    // const { imgList, imgLoadList } = this.state

    const { username, userPhone, userAddress, loading } = this.state
    const isBtnDisabled = !username || !userPhone

    if (!this.state.loaded) {
      return <Loading />
    }

    const { homeInfo, pin, banner, goodShops } = this.props
    return (
      <View className='home'>
        <ScrollView
          scrollY
          className='home__wrap'
          style={{ height: getWindowHeight() }}
        >
          <View>
            <Banner list={banner} />
            {/*<Policy list={homeInfo.policyDesc} />*/}

            <ClTitleBar title='优秀店铺' subTitle='recommendItems' type='sub-title' textColor='gradualPink' subTitleColor='red' />

            <View className='good-shops'>
              {goodShops.map(item => (
                <View key={item.id} className='img-border' onClick={this.handleGoodShopClick.bind(this, item)}>
                  <Image
                    className='img-border-inner'
                    mode='aspectFill'
                    src={IMG_URL + item.shoppicture}
                  />

                  {/*<View className='home-good-shops-info'>*/}
                    {/*<View className='price-blur-box'>*/}
                      {/*<Text className='home-good-shops-price'>{`${item.shopname}`}</Text>*/}
                    {/*</View>*/}
                  {/*</View>*/}
                </View>
              ))}
            </View>
            {/* 优秀店铺 */}
            {/*<Pin*/}
              {/*banner={homeInfo.newUserExclusive}*/}
              {/*list={pin}*/}
            {/*/>*/}

            <View>
              <Image
                className='at-article__img'
                src={loginBanner}
                mode='widthFix' />
            </View>

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

          <View className='at-article'>
            <View className='at-article__h1'>
              公司简介
            </View>
            {/*</View>*/}
            <View className='at-article__content'>
              <View className='at-article__section'>
                <View className='at-article__p'>
                  纤尊秀养生瘦身是通过外敷法并配合按摩手法达到瘦身目的，安全健康有效。外敷通过肚脐渗透吸收，调节人体脂肪代谢系统，促进脂肪消耗，将积于体内的淤积废物排出体外，调整内分泌平衡，帮客户减掉肥根，适合各种人群。
                </View>
                <Image
                  className='at-article__img'
                  src={IMG_URL + 'uploads/qzx/assets/index10.jpg'}
                  mode='widthFix' />
              </View>
            </View>
          </View>

          {/*<View className='img_list'>*/}
            {/*{imgList.map((item, index) => {*/}
              {/*return (*/}
                {/*<View className='img_wrap' key={index}>*/}
                  {/*{item.loaded && <Image src={item.url} className='fade_in' />}*/}
                {/*</View>*/}
              {/*)*/}
            {/*})}*/}
          {/*</View>*/}
          {/*<Button onClick={this.loadImages}>Click To Load Images</Button>*/}
          {/*  引入图片预加载组件  */}
          {/*<Block>*/}
            {/*{imgLoadList.map((item, index) => {*/}
              {/*return (*/}
                {/*<Image*/}
                  {/*key={index}*/}
                  {/*src={item}*/}
                  {/*data-src={item}*/}
                  {/*onLoad={this.imgLoader._imgOnLoad.bind(this.imgLoader)}*/}
                  {/*onError={this.imgLoader._imgOnLoadError.bind(this.imgLoader)}*/}
                  {/*style='width:0;height:0;opacity:0'*/}
                {/*/>*/}
              {/*)*/}
            {/*})}*/}
          {/*</Block>*/}

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

          <AtCurtain
            isOpened={this.state.isCurtainOpened}
            onClose={this.onClose.bind(this)}
            closeBtnPosition = 'top-right'
          >
            <AtForm
              onSubmit={this.onSubmit}
            >
              <AtInput
                name='value3'
                title='姓名'
                type='string'
                placeholder='请输入姓名'
                value={username}
                onChange={this.handleInput.bind(this, 'username')}
              />

              <AtInput
                name='value3'
                title='地址'
                type='string'
                placeholder='请输入所在地址'
                value={userAddress}
                onChange={this.handleInput.bind(this, 'userAddress')}
              />

              <AtInput
                name='value3'
                title='电话'
                type='number'
                placeholder='联系电话用于后期反馈'
                value={userPhone}
                onChange={this.handleInput.bind(this, 'userPhone')}
              />

              <AtButton formType='submit' disabled={isBtnDisabled} loading={loading} type='primary'>提交</AtButton>

            </AtForm>
          </AtCurtain>

          <AtActionSheet cancelText='我再看看吧' title='对我们感兴趣？' isOpened={this.state.isOpen}>
            <AtActionSheetItem onClick={this.callPhone}>
              咨询
            </AtActionSheetItem>
            <AtActionSheetItem onClick={this.contactUs}>
              加盟
            </AtActionSheetItem>
          </AtActionSheet>

        </ScrollView>
      </View>
    )
  }
}

export default Index
