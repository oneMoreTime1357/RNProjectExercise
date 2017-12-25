import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import styles from './styles'

export default class Home extends Component {
  static navigationOptions = {
    title: '首页'
  }

  constructor () {
    super()

    this.state = {
      data: [
        {
          key: 0,
          title: 'Drag page'
        }
      ]
    }
  }

  render () {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.pageContain}>
        <TouchableOpacity onPress={() => navigate('DragView', { title: '拖拽' })}>
          <View style={styles.cellItem}>
            <Text>拖拽</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}