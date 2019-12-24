
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './message-detail.scss'
import * as actions from '@actions/message-detail';
import { AtList, AtListItem } from "taro-ui"
import {IMG_URL} from '@constants/api';

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
    Taro.showLoading({
      title: '加载中...'
    })
    this.props.dispatchMessageDetail({
      id: this.messageId
    }).then(res => {
      Taro.hideLoading()
      console.log(res)
      if(res['sourceid']){
        this.props.dispatchCurrentShopDetail({id: res['sourceid']})
      }
      if(res['shopid']){
        this.props.dispatchSourceShopDetail({id: res['shopid']})
      }
    })
  }


  render() {
    const { messageDetailItem, sourceShopDetailItem, currentShopDetailItem} = this.props
    console.log(messageDetailItem)
    return(
      <View>
        {messageDetailItem && 
          <AtList>
            <AtListItem title='消息类型' note={messageDetailItem.type} />
            {currentShopDetailItem && 
            <AtListItem title='当前店铺' note={currentShopDetailItem['shopname'] + ' ' + currentShopDetailItem['username'] + ' ' + currentShopDetailItem['owner_phone']} />
            }
            {
              sourceShopDetailItem && 
              <AtListItem title='佣金来源' note={sourceShopDetailItem['shopname'] + ' ' + sourceShopDetailItem['username'] + ' ' + sourceShopDetailItem['owner_phone']} />
            }
            
            {messageDetailItem.money && <AtListItem title='佣金' note={messageDetailItem.money} />}
            
            {messageDetailItem.subscribe && <AtListItem title='描述' note={messageDetailItem.subscribe} />}

            {messageDetailItem.image && 
            <View>
            <AtListItem title='记录' />
            <Image 
              className='at-article__img' 
              src={IMG_URL + messageDetailItem.image} 
              mode='widthFix' />
            </View>}
            
          </AtList>
        }
      </View>
    )
  }
}
