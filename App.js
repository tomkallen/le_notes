import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import listData from './components/Data'
import List from './components/List'

export default class App extends Component {
  state = { listData: [] }

  componentDidMount () {
    this.setState({ listData })
  }

  markAsCompleted = (id) => {

    const newData = [...this.state.listData]
    const itemIndex = newData.findIndex(e => e.id === id)
    newData[itemIndex].completed = !newData[itemIndex].completed
    this.setState({ listData: newData })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Ye Olde Hare Deeds</Text>
        <List
          markAsCompleted={this.markAsCompleted}
          style={styles.list} data={this.state.listData}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  list: {
    flex: 1,
    marginTop: 32,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 64,
    marginLeft: 16,
  }
})
