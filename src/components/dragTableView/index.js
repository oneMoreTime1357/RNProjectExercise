import React, { Component } from 'react'
import {
  Text,
  ScrollView,
  Image,
  PanResponder,
  View,
} from 'react-native'
import styles from './styles'
import DragRowComponent from './dragRowComponent'

const arrayMove = (arr, old_index, new_index) => {
	if (new_index >= arr.length) {
		var k = new_index - arr.length;
		while ((k--) + 1) {
			arr.push(undefined);
		}
	}
	arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
	return arr;
}

export default class DragTableView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      scrollEnabled: true,
      rows: props.rows
    }

    this.draggableRows = []
    this.currentIndex = null
  }

  componentWillReceiveProps({ rows }) {
    this.setState({ rows: rows})
  }

  _registerDraggableRow = (draggableRow) => {
    this.draggableRows.push(draggableRow)
  }

  _unregisterDraggableRow = (draggableRow) => {
    this.draggableRows.push(draggableRow)
  }

	_getIndexByPositon = (offset) => {
		let index = parseInt(offset / this.props.height)
		let len = this.state.rows.length - 1
		return index < 0 ? 0 : index > len ? len : index
  }
  
  _getStartById = (idx) => {
		return this.props.height * idx
	}

  _dragStart = (gestureState, draggableRow) => {
    this.currentIndex = draggableRow.props.idx

    if(this.props.startDrag) this.props.startDrag()
  }

  _dragMove = (gestureState, draggableRow) => {
    let start = draggableRow.start
    let middle = start + (this.props.height / 2)

    let offsetDrag = middle + gestureState.dy
    console.log('拖拽的长度', offsetDrag)
    let rowUnder = this.draggableRows.find((dr) => {
      if (dr === draggableRow) return false
      return dr.containsPosition(offsetDrag)
    })
    console.log(rowUnder)
    if (rowUnder) {
      let nextIndex = this._getIndexByPositon(rowUnder.setTop)
      if (nextIndex !== this.currentIndex) {
        let starts = this._getStartById(this.currentIndex)
        rowUnder.setTop = starts
        this.currentIndex = nextIndex
      }
    }
  }

  _dragDrop = (getstureState, draggableRow) => {
    let rows = this.state.rows
    let from = draggableRow.props.idx
    let to = this.currentIndex
    draggableRow.setTop = this._getStartById(this.currentIndex)

    rows = this.handleDrop(from, to)
    this.setState({ rows: rows })

    if (this.props.stopDrag) {
      this.props.stopDrag()
    }
  }

  handleDrop = (from, to) => {
    return arrayMove(this.state.rows, from, to)
  }

  setScrollEnabled = (enabled) => {
    this.setState({ scrollEnabled: enabled })
  }

  renderRow = (item) => {
    return this.props.renderRow(item)
  }

  _renderRows () {
    return this.state.rows.map((item, idx) => {
      return (
        <DragRowComponent
          key={item.key}
          item={item}
          idx={idx}
          renderRow={this.renderRow}
          height={this.props.height}
          _registerDraggableRow={this._registerDraggableRow}
          _unregisterDraggableRow={this._unregisterDraggableRow}
          _dragMove={this._dragMove}
          _dragDrop={this._dragDrop}
          _dragStart={this._dragStart}
          setScrollEnabled={this.setScrollEnabled}
        ></DragRowComponent>
      )
    })
  }

  render () {
    let rows = this._renderRows()
    return (
      <ScrollView
        ref={(ref) => this.list = ref}
        scrollEnabled={this.state.scrollEnabled}
        scrollEventThrottle={256}
      >
        <View>
          {rows}
        </View>
      </ScrollView>
    )
  }
}
