
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './allowance.scss'
import * as actions from '@actions/allowance';
import {AtList, AtListItem, AtPagination} from 'taro-ui'

@connect(state => state.allowance, actions)
export default class Allowance extends Component {
  config = {
    navigationBarTitleText: '提现管理'
  }

  constructor(props) {
    super(props)
    this.state = {
      allowanceItem: {},
      allowanceList: []
    }
  }

  componentDidShow(){
    this.props.dispatchAllowance({pi: 1,ps: 10}).then(res => {
      console.log(res)
      this.setState({
        allowanceItem: res,
        allowanceList: res['list']
      })
    })
  }
  alterPage = (page) => {
    console.log(page);
    this.props.dispatchAllowance({pi: page.current,ps: 10}).then(res => {
      console.log(res)
      this.setState({
        allowanceItem: res,
        allowanceList: res['list']
      })
    })
  }
  goCashPage(item){
    console.log(item)
    Taro.navigateTo({
      url: `/pages/cashout/cashout?shopId=${item.id}`
    })
  }
  render() {
    let {allowanceItem, allowanceList} = this.state
    console.log(allowanceList)
    return(
      <View>
        <AtList hasBorder={false}>
          {allowanceList &&
          allowanceList.map(item => (
              <AtListItem
                onClick={this.goCashPage.bind(this, item)}
                title={item.shopname + '--' + item.username}
                note={'可提现金额 ' + item['cashin'] + '元'}
                extraText='提现'
                arrow='right'
                thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
              />
            ))
          }

        </AtList>

        {/*pageNum: 1*/}
        {/*pageSize: 10*/}
        {/*pages: 3*/}
        {/*size: 10*/}
        {/*total: 21*/}
        {
          allowanceItem &&  <AtPagination
            total={allowanceItem.total}
            pageSize={allowanceItem.pageSize}
            current={allowanceItem.pageNum}
            onPageChange={this.alterPage}
          >
          </AtPagination>
        }
      </View>
    )
  }
}
