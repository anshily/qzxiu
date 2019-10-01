import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { CheckboxItem, ButtonItem } from '@components'
import './index.scss'

export default class Footer extends Component {
  static defaultProps = {
    cartInfo: {},
    onToggle: () => {}
  }

  state = {
    actualPrice: 0
  }

  componentDidShow(){
    this.updatePrice()
  }

  updatePrice() {
    const { list } = this.props;
    let price = this.state.actualPrice;
    list.forEach(item => {
      if (item.check){
        price += item.actualPrice
      }
    })
    this.setState({
      actualPrice: price
    })
  }

  handleUpdateCheck = () => {
    const { list, cartInfo } = this.props;
    let flag = cartInfo.selectedCount && cartInfo.selectedCount > 0
    let order = list.map(item => {
      if (flag) {
        item.checked = false;
        return item;
      }else {
        item.checked = true;
        return item;
      }
    });
    this.props.onUpdateCheck(order)
  }

  handleOrder = (item) => {
    const { list } = this.props;

    console.log(item, list);
    let orders = [];
    list.forEach(order => {
      if (order.check) {
        orders.push(order)
      }
    });
    this.props.onAddOrder(orders);
  }

  render () {
    const { cartInfo } = this.props
    return (
      <View className='cart-footer'>
        <View className='cart-footer__select'>
          <CheckboxItem
            checked={!!cartInfo.selectedCount}
            onClick={this.handleUpdateCheck}
          >
            <Text className='cart-footer__select-txt'>
              {!cartInfo.selectedCount ? '全选' : `已选(${cartInfo.selectedCount})`}
            </Text>
          </CheckboxItem>
        </View>
        <View className='cart-footer__amount'>
          <Text className='cart-footer__amount-txt'>
            ¥{parseFloat(cartInfo.actualPrice).toFixed(2)}
          </Text>
        </View>
        <View className='cart-footer__btn'>
          <ButtonItem
            type='primary'
            text='下单'
            onClick={this.handleOrder}
          />
        </View>
      </View>
    )
  }
}
