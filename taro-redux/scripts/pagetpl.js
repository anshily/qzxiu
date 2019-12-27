/**
 *  pages 页面快速生成脚本
 *
 *  npm run tem '文件名‘
 */

const fs = require('fs')
const dirName = process.argv[2]
console.log(dirName)
const subNameArr = dirName.split('-')
console.log(subNameArr)
let subName = subNameArr ? subNameArr[0] :dirName;
if (subNameArr.length > 1){
  for (let i = 1; i < subNameArr.length; i++) {
    subName = subName + subNameArr[i].substring(0, 1).toUpperCase() + subNameArr[i].substring(1);
  }
}
console.log(subName)
const capPirName = subName.substring(0, 1).toUpperCase() + subName.substring(1);
const constName = dirName.toUpperCase();

if (!dirName) {
  console.log('文件名不能为空');
  console.log('用法：npm run tem test');
  process.exit(0);
}

// 页面模板构建

const indexTpl = `
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './${dirName}.scss'
import * as actions from '@actions/${dirName}';

@connect(state => state.${subName}, actions)
export default class ${capPirName} extends Component {
  config = {
    navigationBarTitleText: '${dirName}'
  }
  render() {
    return(
      <View>
        <Text>
          ${dirName}
        </Text>
      </View>
    )
  }
}
`

// scss 文件模板

const scssTep = `
    @import "../../assets/scss/variables";
    .#{$prefix} {
        &-${dirName}-wrap {
            width: 100%;
            min-height: 100Vh;
        }
    }
`

// action

const actionTpl =`
import {createAction} from '@utils/redux';
import {ROOT_URL} from '@constants/api';

export const dispatch${capPirName} = payload => createAction({
  url: ROOT_URL + '${subName}',
  type: '${constName}_ADD',
  method: 'POST',
  payload
})
`

// reducer

const reducerTpl =`
const INITIAL_STATE = {
  ${subName}Item: {},
}

export default function ${subName}(state = {}, action) {
  switch(action.type) {
    case '${constName}_ADD': {
      const { ${subName}Item } = action.payload
      return { ...state, ${subName}Item: ${subName}Item }
    }
    default:
      return state
  }
}
`

fs.mkdirSync(`./src/pages/${dirName}`); // mkdir $1
process.chdir(`./src/pages/${dirName}`); // cd $1

fs.writeFileSync(`${dirName}.js`, indexTpl); //tsx
fs.writeFileSync(`${dirName}.scss`, scssTep); // scss

process.chdir('../../'); // ./src/
fs.writeFileSync(`./actions/${dirName}.js`, actionTpl); // action
fs.writeFileSync(`./reducers/${dirName}.js`, reducerTpl); // action
// fs.writeFileSync('service.ts', serviceTep); // service
// fs.writeFileSync('model.ts', modelTep); // model
// fs.writeFileSync(`${dirName}.interface.ts`, interfaceTep); // interface
process.exit(0);




