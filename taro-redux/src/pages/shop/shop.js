
import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './shop.scss'
import * as actions from '@actions/shop';
import ParserRichText from '@components/ParserRichText/parserRichText';
import { AtList, AtListItem } from "taro-ui"
import {IMG_URL} from "@constants/api";

@connect(state => state.shop, actions)
export default class Shop extends Component {
  config = {
    navigationBarTitleText: '商铺详情'
  }

  static defaultProps = {
    shopItem: ''
  }

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      selected: {},
      role: Taro.getStorageSync('user_role')
    }
    this.shopId = parseInt(this.$router.params.shopId)
  }

  componentDidShow() {
    this.setState({
      role: Taro.getStorageSync('user_role')
    })
  }

  componentDidMount() {
    this.props.dispatchShopInit({
      id: this.shopId
    })
  }
  render() {
    const { shopItem } = this.props;
    const {role} = this.state;
    let show;
    if (role == "总店管理员") {

      show = (<View>


        <AtList>
          <AtListItem title='店铺名' note={shopItem.shopname} />
          <AtListItem title='店主姓名' note={shopItem.username} />
          <AtListItem title='联系方式' note={shopItem.owner_phone} />
          <AtListItem title='店铺地址' note={shopItem.shopaddress} />
          <AtListItem title='佣金' note={shopItem.cashin} />
        </AtList>

        <ParserRichText html={shopItem.description} selectable></ParserRichText>
      </View>)
    }else {
      show = (
        <View>
          <Image src={ IMG_URL + shopItem.shoppicture } mode='aspectFill' className='pic-info' />
          <AtList>
            <AtListItem title='店铺名' note={shopItem.shopname} />
          </AtList>
        </View>
      )
    }

    return show;
  }
}
