import React, { Component } from 'react'
import { FlatList } from 'react-native'
import ListItem from './ListItem'

export default class List extends Component {
  state = { scrollEnabled: true }

  renderItem = (item) =>
    <ListItem
      setScrollEnabled={this.setScrollEnabled}
      text={item.key}
      itemId={item.id}
      completed={item.completed}
      markAsCompleted={this.props.markAsCompleted}
    />

  setScrollEnabled = (scrollEnabled) => this.setState({ scrollEnabled })

  render () {
    return (
      <FlatList
        style={this.props.style}
        data={this.props.data}
        renderItem={({ item }) => this.renderItem(item)}
        scrollEnabled={this.state.scrollEnabled}
      />
    )
  }
}
