
import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './shop.scss'
import * as actions from '@actions/shop';
import ParserRichText from '@components/ParserRichText/parserRichText';
import {IMG_URL} from "@constants/api";

@connect(state => state.shop, actions)
export default class Shop extends Component {
  config = {
    navigationBarTitleText: 'shop'
  }

  static defaultProps = {
    shopItem: ''
  }

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      selected: {}
    }
    this.shopId = parseInt(this.$router.params.shopId)
  }

  componentDidMount() {
    this.props.dispatchShopInit({
      id: this.shopId
    })
  }
  render() {
    const { shopItem } = this.props;
    console.log(shopItem)
    return(
      <View>
        <Image src={ IMG_URL + shopItem.shoppicture} mode='scaleToFill' className='pic-info' />
        <ParserRichText html={shopItem.description} selectable></ParserRichText>
      </View>
    )
  }
}
