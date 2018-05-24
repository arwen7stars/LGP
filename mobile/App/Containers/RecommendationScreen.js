import React, { Component } from 'react'
import { View, Image, ActivityIndicator } from 'react-native'

// Native Base
import { Container, Content, Button, Text, Icon} from 'native-base'

// Styles
import activityStyle from './Styles/ActivityIndicatorStyle'
import styles from './Styles/RecommendationScreenStyles'

import {baseURL} from "../Services/Api";

// Component
export default class RecommendationScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Recomendações',
  });

  // This component's constructor
  constructor (props) {
    super(props);
    this.state = {
      loaded: false,
      houses: [],
    };
  }

  // Fetch data here
  componentDidMount () {
    fetch(baseURL + "/v1/houses")
      .then(function (response) {
        return response.json();
      })
      .then(responseJson => {
        this.setState({ houses: responseJson });
        this.setState({loaded : true});
      })
      .catch(function (json) {
        console.error(json)
      })
  }

  // Clear data here
  componentWillUnmount () {
    this.setState({ houses: [] })
  }

  // Render the screen
  render () {

    const { navigate } = this.props.navigation;

    if(this.state.loaded) {
      return (
        <Container>

          <Content padder>
            <View style={{ marginBottom: 20 }}>
              {
                this.state.houses.map((item, index) => {
                  return (
                  <View style={styles.box1} key={index} >
                    <View style={{ flex:0.37, width:'90%' , height:125}} >
                      <Image source={{ uri: item.images[0] }} style={{ height: 200, width: null, flex: 1 }}/>
                    </View>

                    <View style={{ flex:0.5}}>
                      <View style={{ flex:0.5}}>
                        <Text style={styles.address}>
                            <Icon ios={'ios-pin'} android={'md-pin'} style={styles.icon} /> {item.address.town}
                        </Text>
                        <Text style={styles.money}>
                            {item.price} &#8364;
                        </Text>
                      </View>
                    </View>

                    <View style={{flex:0.13, marginTop: 40}} >
                        <Button transparent onPress={() => this.props.navigation.navigate('HouseInformation',{house: item })}>
                          <Text>
                            <Icon style={styles.arrow} ios={'ion-ios-arrow-forward'} android={'md-arrow-forward'} />
                          </Text>
                        </Button>
                    </View>

                  </View>


                  )
                })
              }
            </View>
          </Content>
        </Container>
      )
    } else {
      return (
        <View style={[activityStyle.container, activityStyle.horizontal]}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )
    }
  }
}