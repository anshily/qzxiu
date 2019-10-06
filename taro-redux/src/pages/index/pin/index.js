import Taro, { Component } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import { HomeTitle } from '@components'
import {IMG_URL} from '@constants/api';
import './index.scss'

export default class Pin extends Component {
  static defaultProps = {
    banner: {},
    list: []
  }

  handleClick = (item) => {
    console.log(item)
    Taro.navigateTo({
      url: `/pages/shop/shop?shopId=${item.id}`
    })
  }

  render () {
    const { banner: { picUrls = [] }, list } = this.props
    return (
      <View className='home-pin'>
        {/*<View className='home-pin__banner'>*/}
          {/*{picUrls.map((item, index) => (*/}
            {/*<View key={index} className='home-pin__banner-item'>*/}
              {/*<Image*/}
                {/*className='home-pin__banner-item-img'*/}
                {/*src={item}*/}
                {/*mode='widthFix'*/}
              {/*/>*/}
            {/*</View>*/}
          {/*))}*/}
        {/*</View>*/}

        <HomeTitle
          title='优秀店铺'
          link='#'
        />
        <View className='home-pin__wrap'>
          <Swiper
            className='home-pin__swiper'
            autoplay
            indicatorDots
            indicatorActiveColor='rgb(178, 42, 49)'
          >
            {list.map((group, index) => (
              <SwiperItem
                key={index}
                className='home-pin__swiper-item'
              >
                {group.map(item => (
                  <View key={item.id} className='home-pin__item' onClick={this.handleClick.bind(this, item)}>
                    <Image
                      className='home-pin__item-img'
                      src={IMG_URL + item.shoppicture}
                    />
                    <View className='home-pin__item-info'>
                      <Text className='home-pin__item-price'>{`已提现¥${item.profit}`}</Text>
                      <Text className='home-pin__item-origin'>¥{item.cashin}</Text>
                    </View>
                    {/*<View className='home-pin__item-num'>*/}
                      {/*<Text className='home-pin__item-num-txt'>{item.userNum}人团</Text>*/}
                    {/*</View>*/}
                  </View>
                ))}
              </SwiperItem>
            ))}
          </Swiper>
        </View>
      </View>
    )
  }
}
