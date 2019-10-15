
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
  render() {
    let {allowanceItem} = this.props
    return(
      <View>
        <AtList hasBorder={false}>
          {
            allowanceItem.list.map(item => (
              <AtListItem
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
        >
        </AtPagination>
      </View>
    )
  }
}
