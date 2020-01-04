
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtList, AtListItem, AtLoadMore } from 'taro-ui'

import './message.scss'
import * as actions from '@actions/message';

@connect(state => state.message, actions)
export default class Message extends Component {
  static defaultProps = {
    messages: []
  }

  constructor(props) {
    super(props)
    this.state = {
      status: 'noMore'
    }
  }

  config = {
    navigationBarTitleText: '消息中心'
  }

  componentDidShow(){
    this.props.dispatchMessageList({shopid: Taro.getStorageSync('shopId')}).then(res => {
      console.log(res)
    })
  }
  alterPage(page){
    console.log(page);
  }

  goDetail(item){
    console.log(item)
    Taro.navigateTo({
      url: `/pages/message-detail/message-detail?messageId=${item.id}`
    })
  }

  render() {
    const {messages} = this.props;
    return(
      <View>
        <AtList hasBorder={false}>
          {messages && messages.map(item => (
              <AtListItem
                onClick={this.goDetail.bind(this, item)}
                key={String(item.id)}
                title={item.type}
                note={item['subscribe']}
                extraText='详细信息'
                arrow='right'
                thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
              />
            ))
          }
        </AtList>
        {/*{messages && <AtPagination*/}
          {/*total={allowanceItem.total}*/}
          {/*pageSize={allowanceItem.pageSize}*/}
          {/*current={allowanceItem.pageNum}*/}
          {/*onPageChange={this.alterPage}*/}
        {/*>*/}
        {/*</AtPagination>}*/}

        {(!messages || messages.length == 0) && <AtLoadMore
          status={this.state.status}
        />}
      </View>
    )
  }
}
