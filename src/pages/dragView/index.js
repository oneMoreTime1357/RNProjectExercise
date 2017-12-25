import React, { Component } from 'react'
import {
  Text,
  View,
  ListView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native'
import styles from './styles'
import DragTableView from '../../components/dragTableView'

export default class DragView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`
  })

  constructor (props) {
    super(props)
    this.state = {
      data: [
        {
          key: 0,
          title: '1、乔布斯传'
        }, {
          key: 1,
          title: '2、理性乐观派'
        }, {
          key: 2,
          title: '3、按自己的意愿过一生'
        }, {
          key: 3,
          title: '4、人类简史'
        }, {
          key: 4,
          title: '5、按自己的意愿过一生'
        }, {
          key: 5,
          title: '6、小狗钱钱'
        }, {
          key: 6,
          title: '7、向前一步'
        },
      ]
    }

    this.rowsData = this.state.data
  }

  renderRow = (item) => {
    return <RowContent item={item}></RowContent>
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <DragTableView
          ref={(ref) => this.list = ref}
          rows={this.rowsData}
          renderRow={this.renderRow}
          height={55}
        ></DragTableView>
      </View>
    )
  }
}

// 自定义单元格样式
class RowContent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View style={styles.rowContainer}>
        <Text style={styles.textStyle}>{ this.props.item.title }</Text>
      </View>
    )
  }
}