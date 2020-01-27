import React, { Component } from 'react';

import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

import LocalizedStrings from 'react-native-localization';

import {  createAppContainer } from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';

const All_Language_Strings = new LocalizedStrings({
  "hi": {
    text_1: "हैलो दोस्तों.",
    text_2: "हमारी वैबसाइट पर आपका स्वागत है.",
  },
  "en": {
    text_1: "Hello Guys.",
    text_2: "Welcome to our Website.",
  },
  "fr": {
    text_1: "Bonjour les gars.",
    text_2: "Bienvenue sur notre site.",
  },
  "sp": {
    text_1: "Hola chicos.",
    text_2: "Bienvenido a nuestro sitio web.",
  }
});

class Select_Language_Screen extends Component {

  static navigationOptions =
    {
      title: 'Select_Language_Screen',
      header: null
    };

  constructor(props) {
    super(props);
    this.lang = [
      { shortName: 'hi', longName: 'Hindi' },
      { shortName: 'en', longName: 'English' },
      { shortName: 'fr', longName: 'French' },
      { shortName: 'sp', longName: 'Spanish' },
    ];
  }

  navigate_To_Next_Activity(item) {

    All_Language_Strings.setLanguage(item);

    this.props.navigation.navigate('Second', { Language_Code: item });

  }
  render() {
    return (
      <View style={styles.MainContainer}>

        <Text style={styles.heading}>
          Please Select Your Language
        </Text>

        <Image
          source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2019/06/language_icon.png' }}
          style={styles.imageStyle}
        />

        <ScrollView style={{ marginTop: 30, width: '80%' }}>
          {
            this.lang.map((item, key) => (

              <TouchableOpacity key={key} onPress={this.navigate_To_Next_Activity.bind(this, item.shortName)}>

                <Text style={styles.text} >{item.longName} </Text>

                <View style={{ width: '100%', height: 1, backgroundColor: '#000' }} />

              </TouchableOpacity>

            ))
          }
        </ScrollView>

      </View>
    );
  }
}

class HomeScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('Title', 'Default Title'),
    };
  };
  componentDidMount() {
    var that = this;
    var heading = '';
    if (this.props.navigation.state.params.Language_Code == 'hi') {
      heading = 'Selected Language Hindi';
    } else if (
      this.props.navigation.state.params.Language_Code == 'en'
    ) {
      heading = 'Selected Language English';
    } else if (
      this.props.navigation.state.params.Language_Code == 'fr'
    ) {
      heading = 'Selected Language French';
    }
    else if (
      this.props.navigation.state.params.Language_Code == 'sp'
    ) {
      heading = 'Selected Language Spanish';
    }
    that.props.navigation.setParams({
      Title: heading,
    });
  }

  render() {
    return (
      <View style={styles.MainContainer}>

        <Text style={styles.text}> {All_Language_Strings.text_1}</Text>

        <Text style={styles.text}> {All_Language_Strings.text_2} </Text>

      </View>
    );
  }
}

const Root = createStackNavigator(
  {
    Home: Select_Language_Screen,
    Second: HomeScreen
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(Root);

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  heading: {
    color: '#000',
    fontSize: 28,
    textAlign: 'center',
    marginTop: 40
  },
  imageStyle: {
    width: 64,
    height: 64,
    marginTop: 30
  },
  text: {
    color: '#000',
    fontSize: 24,
    textAlign: 'center',
    padding: 10
  }
});