import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback,
	Alert,
	PanResponder,
	ScrollView,
	Animated,
	Easing, Platform, TouchableOpacity,
  LayoutAnimation,
  Image
} from 'react-native'

export default class DragRowComponent extends Component {
  _selfTop = 0

  constructor (props) {
    super(props)
    this.dragging = false
  }

  set setTop (top) {
		this._selfTop = top
		this.selfRef.setNativeProps({
			style: { top: top }
		})
	}

	get setTop () {
		return this._selfTop
	}

  get start () {
    let _start = 0
    for (let i = 0; i < this.props.idx; i++) {
      _start += this.props.height
    }
    this._selfTop = _start
    return _start
  }

  get size () {
    return this.props.height
  }

  containsPosition = (middle) => {
		let start = this._selfTop
		let bottom = start + this.size
		return (middle >= start && middle <= bottom)
	}

  componentWillMount () {
    let self = this
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        // 监听到手势，手势开始响应
        self.dragging = true
        self._dragStart(gestureState)
      },
      onPanResponderMove: (evt, gestureState) => {
        if (self.dragging) {
          self._dragMove(gestureState)
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (self.dragging) {
          self._dragDrop(gestureState)
        }
        self.dragging = false
      },
      onPanResponderTerminate: (evt, gestureState) => {
        if (self.dragging) {
          self._dragDrop(gestureState)
        }
        self.dragging = false
      },
      onShouldBlockNativeResponder: () => true
    })
    // console.log('初始化，刚开始的时候')
    this.props._registerDraggableRow(this)
  }

  componentWillUnmount () {
    this.props._unregisterDraggableRow(this)
  }

  _dragStart = (gestureState) => {
    // drag start
    this.props.setScrollEnabled(false)
    this.props._dragStart(gestureState, this)
    this.selfRef.setNativeProps({
      style: {
        height: this.size,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { height: 0, width: 2},
        elevation: 5,
        zIndex: 2,
      }
    })
  }

  _dragMove = (gestureState) => {// 拖拽移动
    this.selfRef.setNativeProps({
			style: { top: this.start + gestureState.dy }
		})
		this.props._dragMove(gestureState, this)
  }

  _dragDrop = (gestureState) => {
    // 拖拽停止
    this.props.setScrollEnabled(true)
    
    this.selfRef.setNativeProps({
      style: {
        height: this.size,
        shadowColor: "#000",
        shadowOpacity: 0,
        shadowRadius: 0,
        shadowOffset: { height: 0, width: 0, },
        elevation: 0,
        zIndex: 0,
      }
    })
    this.props._dragDrop(gestureState, this)
  }

  render () {
    let base_style = {
      position: 'absolute',
      top: this.start,
      height: this.size,
      right: 0,
			left: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: 'white',
    }

    let rowContent = this.props.renderRow(this.props.item)

    let drag_style = {
      position: 'absolute',
      height: this.size,
      right: 0,
      width: 37,
      justifyContent: 'center',
    }
    let dragHandle = (
      <View style={drag_style} {...this._panResponder.panHandlers}>
        <Image style={styles.dragMenu} source={require('../../assets/images/list_menu.png')}></Image>
      </View>
    )

    return (
      <View style={[base_style, styles.mainContain]} ref={refs => this.selfRef = refs}>
        {rowContent}
        {dragHandle}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContain: {
    flex: 1,
    flexDirection: 'row'
  },
  dragMenu: {
    width: 22,
    height: 10
  },
})