import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { Popup, Loading } from '@components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/item'
import { dispatchAdd } from '@actions/cart'
import { dispatchOrder } from '@actions/order'
import { getWindowHeight } from '@utils/style'
import * as cartUtil from '@utils/cart'
import Gallery from './gallery'
import InfoBase from './info-base'
import InfoParam from './info-param'
import Detail from './detail'
import Footer from './footer'
import Spec from './spec'
import './item.scss'

@connect(state => state.item, { ...actions, dispatchAdd, dispatchOrder })
class Item extends Component {
  config = {
    navigationBarTitleText: '商品详情'
  }

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      selected: {}
    }
    this.itemId = parseInt(this.$router.params.itemId)
  }

  componentDidMount() {
    console.log(this.itemId);
    this.props.dispatchItem({ id: this.itemId }).then(() => {
      this.setState({ loaded: true })
    })
  }

  handleSelect = (selected) => {
    this.setState({ selected })
  }

  handleBuy = () => {
    const { itemInfo } = this.props
    const { visible, selected } = this.state
    const isSelected = visible && !!itemInfo.id

    // if (isSelected || isSingleSpec) {
    if (isSelected ) {
      const selectedItem = isSelected && !!isSelected.id && !!isSelected.cnt ? selected : {
        id: itemInfo.id,
        cnt: 1
      }
      // const skuItem = itemInfo.skuMap[selectedItem.id] || {}
      const payload = {
        shopId: Taro.getStorageSync('shopId'),
        list: [{
          goodsId: selectedItem.id,
          goodsNum: selectedItem.cnt,
          goodsPrice: itemInfo.activityPrice * selectedItem.cnt
        }],
        token: Taro.getStorageSync('user_token')
      }
      this.props.dispatchOrder(payload).then(res => {
        console.log(res)
        Taro.showToast({
          title: '下单成功',
          icon: 'none'
        })
      }).catch(err => {
        console.log(err);
        Taro.showToast({
          title: '网络错误',
          icon: 'none'
        })
      })
      if (isSelected) {
        this.toggleVisible()
      }
      return
    }

    if (!visible) {
      this.setState({ visible: true })
    } else {
      // XXX 加购物车逻辑不一定准确
      Taro.showToast({
        title: '请选择规格（或换个商品测试）',
        icon: 'none'
      })
    }
  }

  handleAdd = () => {
    // 添加购物车是先从 skuSpecValueList 中选择规格，再去 skuMap 中找 skuId，多个规格时用 ; 组合
    const { itemInfo } = this.props
    const { visible, selected } = this.state
    const isSelected = visible && !!itemInfo.id

    // if (isSelected || isSingleSpec) {
    if (isSelected ) {
      const selectedItem = isSelected && !!isSelected.id && !!isSelected.cnt ? selected : {
        id: itemInfo.id,
        cnt: 1
      }
      // const skuItem = itemInfo.skuMap[selectedItem.id] || {}
      const payload = {
        id: selectedItem.id,
        cnt: selectedItem.cnt,
        itemName: itemInfo.name,
        pic: itemInfo.listPicUrl,
        actualPrice: itemInfo.activityPrice
      };

      cartUtil.putCart(payload);
      // this.props.dispatchAdd(payload).then(() => {
        Taro.showToast({
          title: '加入购物车成功',
          icon: 'none'
        })
      // })
      if (isSelected) {
        this.toggleVisible()
      }
      return
    }

    if (!visible) {
      this.setState({ visible: true })
    } else {
      // XXX 加购物车逻辑不一定准确
      Taro.showToast({
        title: '请选择规格（或换个商品测试）',
        icon: 'none'
      })
    }
  }

  toggleVisible = () => {
    this.setState({
      visible: !this.state.visible,
      selected: {}
    })
  }

  render () {
    const { itemInfo } = this.props
    const { itemDetail = {} } = itemInfo
    const gallery = [
      itemInfo.listPicUrl,
    ].filter(i => i)
    console.log(gallery)
    const height = getWindowHeight(false)
    // XXX RN 的 transform 写法不同，这块可以统一放到 @utils/style 的 postcss() 中处理
    const popupStyle = process.env.TARO_ENV === 'rn' ?
      { transform: [{ translateY: Taro.pxTransform(-100) }] } :
      { transform: `translateY(${Taro.pxTransform(-100)})` }

    if (!this.state.loaded) {
      return <Loading />
    }

    return (
      <View className='item'>
        <ScrollView
          scrollY
          className='item__wrap'
          style={{ height }}
        >
          <Gallery list={gallery} />
          <InfoBase data={itemInfo} />
          {/*<InfoParam list={itemInfo.attrList} />*/}
          <Detail html={itemDetail.detailHtml} />
        </ScrollView>

        {/* NOTE Popup 一般的实现是 fixed 定位，但 RN 不支持，只能用 absolute，要注意引入位置 */}
        <Popup
          visible={this.state.visible}
          onClose={this.toggleVisible}
          compStyle={popupStyle}
        >
          <Spec
            data={itemInfo}
            selected={this.state.selected}
            onSelect={this.handleSelect}
          />
        </Popup>

        <View className='item__footer'>
          <Footer onAdd={this.handleAdd} onBuy={this.handleBuy} />
        </View>
      </View>
    )
  }
}

export default Item
