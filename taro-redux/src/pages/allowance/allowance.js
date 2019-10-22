
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './allowance.scss'
import * as actions from '@actions/allowance';
import {AtList, AtListItem, AtPagination} from 'taro-ui'

@connect(state => state.allowance, actions)
export default class Allowance extends Component {
  config = {
    navigationBarTitleText: 'allowance'
  }

  componentDidShow(){
    this.props.dispatchAllowance().then(res => {
      console.log(res)
    })
  }
  alterPage(page){
    console.log(page);
  }
  goCashPage(item){
    console.log(item)
    Taro.navigateTo({
      url: `/pages/cashout/cashout?shopId=${item.id}`
    })
  }
  render() {
    let {allowanceItem} = this.props
    return(
      <View>
        <AtList hasBorder={false}>
          {allowanceItem && allowanceItem.list &&
            allowanceItem.list.map(item => (
              <AtListItem
                onClick={this.goCashPage.bind(this, item)}
                key={String(item.id)}
                title={item.shopname}
                note={'可提现金额' + item['cashin']}
                extraText='提现'
                arrow='right'
                thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
              />
            ))
          }

        </AtList>

        <AtPagination
          total={50}
          pageSize={10}
          current={1}
          onPageChange={this.alterPage}
        >
        </AtPagination>
      </View>
    )
  }
}
