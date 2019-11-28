
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './message-detail.scss'
import * as actions from '@actions/message-detail';

@connect(state => state.messageDetail, actions)
export default class MessageDetail extends Component {
  config = {
    navigationBarTitleText: '消息详情'
  }

  
  static defaultProps = {
    orderDetail: {}
  }

  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
    this.messageId = this.$router.params.messageId
  }

  componentDidMount() {
    this.props.dispatchMessageDetail({
      id: this.messageId
    }).then(res => {
      console.log(res)
    })
  }


  render() {
    let messageDetailItem = this.props.messageDetailItem
    console.log(messageDetailItem)
    return(
      <View>
        {messageDetailItem && 
          <AtList>
            <AtListItem title='店铺名' note={messageDetailItem.shopname} />
            <AtListItem title='店主姓名' note={messageDetailItem.username} />
          </AtList>
        }
        
        <Text>
          message-detail
        </Text>
      </View>
    )
  }
}
