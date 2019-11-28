
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
        <Image src={ IMG_URL + shopItem.shoppicture } mode='aspectFill' className='pic-info' />

        <AtList>
          <AtListItem title='店铺名' note={shopItem.shopname} />
          <AtListItem title='店主姓名' note={shopItem.username} />
          <AtListItem title='联系方式' note={shopItem.owner_phone} />
          <AtListItem title='店铺地址' note={shopItem.shopaddress} />
          <AtListItem title='佣金' note={shopItem.cashin} />
        </AtList>

        {/*店铺名	纤尊秀瘦身 养生会所店主姓名	刘静店铺地址	尉氏县文化路与光明路交叉口向北30米佣金	0联系方式	18738988540*/}
        {/*cashin: 0*/}
        {/*cashout: 0*/}
        {/*createtime: "2019-11-04T09:06:45.000+0000"*/}
        {/*description: "<p>null<img src="https://files.sweet.tiantianquan.xyz/uploads/qzx/20191104/747a63ee-9365-4ea7-9732-01711b349de2.jpg"></p>"*/}
        {/*id: 5*/}
        {/*owner_phone: "18898123393"*/}
        {/*profit: 0*/}
        {/*recommmend_type: null*/}
        {/*shopaddress: "通许县幸福路与人民路交叉口，向东200米路北。"*/}
        {/*shopname: "纤尊秀瘦身"*/}
        {/*shoppicture: "uploads/qzx/20191104/bac40255-8e4d-4ee4-83f0-de753064fe29.jpg"*/}
        {/*shoptype_id: 1*/}
        {/*shoptype_name: null*/}
        {/*statu: 1*/}
        {/*updatetime: "2019-11-04T09:06:45.000+0000"*/}
        {/*userid: 202*/}
        {/*username: "张小巧"*/}

        <ParserRichText html={shopItem.description} selectable></ParserRichText>
      </View>
    )
  }
}
