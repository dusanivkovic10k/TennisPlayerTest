import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FlatList, Text, Image, View, Picker, Button } from 'react-native'
import { Images } from '../Themes'

import PlayerActions from '../Redux/PlayerRedux'

// Styles
import styles from './Styles/LaunchScreenStyles'

class LaunchScreen extends Component {
  componentDidMount() {
    this.props.getPlayer()
  }

  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({item}) => {
    return (
      <View style = {styles.playerColumn}>
        <Text style={{flex: 1, textAlign: 'left'}}>{item.name}</Text>
        <Text style={{flex: 1, textAlign: 'left'}}>{this._numberToGenderString(item.gender)}</Text>
        <Text style={{flex: 1, textAlign: 'left'}}>{this._numberToLevelString(item.level)}</Text>
      </View>
    )
  }

  _getFilteredData = () => {
    const { players, filterData } = this.props
    return players.filter(player => {
      const { gender, level } = filterData
      return (player.gender == gender || gender == -1) && (player.level == level || level == -1)
    })
  }

  _numberToGenderString = (num) => {
    switch (num) {
      case 0: return "Male"
      case 1: return "Female"
    }
  }

  _numberToLevelString = (num) => {
    switch (num) {
      case 0: return "Beginner"
      case 1: return "Intermidate"
      case 2: return "Expert"
    }
  }

  render () {
    const { fetching, filterData: {gender, level} } = this.props
    const data = this._getFilteredData()
    return (
      <View style={styles.mainContainer}>
        <View style={{height: 300, flexDirection: 'row'}}>
          <Picker
            selectedValue={gender.toString()}
            style={{height: 50, width: 100}}
            onValueChange={(itemValue, itemIndex) =>
              this.props.setFilter({gender: parseInt(itemValue), level})
            }>
            <Picker.Item label="All" value="-1" />
            <Picker.Item label="Male" value="0" />
            <Picker.Item label="Female" value="1" />
          </Picker>
          <Picker
            selectedValue={level.toString()}
            style={{height: 50, width: 100}}
            onValueChange={(itemValue, itemIndex) =>
              this.props.setFilter({level: parseInt(itemValue), gender})
            }>
            <Picker.Item label="All" value="-1" />
            <Picker.Item label="Beginner" value="0" />
            <Picker.Item label="Intermidate" value="1" />
            <Picker.Item label="Expert" value="2" />
          </Picker>
        </View>
        <FlatList
          data={data}
          extraData={fetching}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    players: state.player.data,
    fetching: state.player.fetching,
    filterData: state.player.filterData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPlayer: () => dispatch(PlayerActions.playerRequest()),
    setFilter: (filters) => dispatch(PlayerActions.playerFilterSet(filters))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
