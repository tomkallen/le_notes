import React, { Component } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Swipeable from 'react-native-swipeable'

const { width } = Dimensions.get('window')

export default class ListItem extends Component {
  state = {
    leftActionActivated: false,
    rightActionActivated: false,
    toggle: false
  }

  markAsCompleted = () => this.props.markAsCompleted(this.props.itemId)

  onLeftAction = () => {
    this.setState({ toggle: !this.state.toggle })
    this.markAsCompleted()
  }

  getRightStyles = () =>
    this.state.rightActionActivated
      ? { backgroundColor: '#ff4b3f', alignItems: 'flex-start' }
      : {
        backgroundColor: '#8f1f1c',
        alignItems: 'flex-start'
      }

  getLeftStyles = () =>
    this.state.leftActionActivated
      ? { backgroundColor: '#ff4b3f' }
      : { backgroundColor: '#115110' }

  getLeftOffContent = () =>
    <View style={[styles.listItemOffContent, styles.leftOff, this.getLeftStyles()]}>
      <Text style={styles.listItemOffContentText}>
        {this.state.leftActionActivated ?
          'Completed!' :
          'Pull right to complete'}</Text></View>

  getRightOffContent = () =>
    <View style={[styles.listItemOffContent, styles.rightOff, this.getRightStyles()]}>
      <Text style={styles.listItemOffContentText}>
        Pull left do delete</Text></View>

  getItemTextStyles = () =>
    this.props.completed
      ? [styles.listItemText, styles.listItemTextCompleted]
      : [styles.listItemText]

  render () {
    const { toggle } = this.state
    return (
      <Swipeable
        leftActionActivationDistance={width / 2}
        rightActionActivationDistance={(width / 2)}
        onSwipeStart={() => this.props.setScrollEnabled(false)}
        onSwipeRelease={() => this.props.setScrollEnabled(true)}
        style={styles.listItem}
        leftContent={this.getLeftOffContent()}
        rightContent={this.getRightOffContent()}
        onLeftActionActivate={() => this.setState({ leftActionActivated: true })}
        onLeftActionDeactivate={() => this.setState({ leftActionActivated: false })}
        onLeftActionComplete={this.onLeftAction}
        onRightActionActivate={() => this.setState({ rightActionActivated: true })}
        onRightActionDeactivate={() => this.setState({ rightActionActivated: false })}
        onRightctionComplete={() => this.setState({ toggle: !toggle })}
      >
        <TouchableOpacity><Text
          style={this.getItemTextStyles()}>{this.props.text}</Text></TouchableOpacity>
      </Swipeable>
    )
  }
}

const styles = StyleSheet.create({
  listItem: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemText: {
    fontSize: 20,
    paddingLeft: 24,
  },
  listItemTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#bbb'
  },
  listItemOffContent: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 20,
  },
  leftOff: {
    paddingRight: 20,
    alignItems: 'flex-end'
  },
  rightOff: {
    paddingLeft: 20,
    alignItems: 'flex-start'
  },
  listItemOffContentText: {
    color: '#fff',
    fontSize: 16,
  }

})