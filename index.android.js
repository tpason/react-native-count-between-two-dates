/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  View
} from 'react-native';
import { DatePickerDialog } from 'react-native-datepicker-dialog'
import * as Animatable from 'react-native-animatable'
import moment from 'moment';
import { Button, Avatar, PRIMARY_COLORS, COLOR, THEME_NAME, Subheader } from 'react-native-material-design';

export default class countDates extends Component {
  constructor(props){
    super(props);
    this.state = {
      dobText: '',
      resultDate: {},
      dobDate: null,
      journeyText: '',
      journeyDate: null,
    }
    this.onPressCountDate = this.onPressCountDate.bind(this);
  }

  onPressCountDate(dobDate, journeyDate) {
      let fromDate = moment(dobDate);
      let toDate = moment(journeyDate);
      let resultDate= {
          dates: toDate.diff(fromDate, 'days'),
          hours: toDate.diff(fromDate, 'hours'),
          minutes: toDate.diff(fromDate, 'minutes'),
          seconds: toDate.diff(fromDate, 'seconds')
      };
      this.setState({ resultDate: resultDate });
    try {
    } catch(error) {
      console.error(error);
    }
  }

  /**
   * DOB textbox click listener
   */
  onDOBPress = () => {
    let dobDate = this.state.dobDate;

    if(!dobDate || dobDate == null){
      dobDate = new Date();
      this.setState({
        dobDate: dobDate
      });
    }

    //To open the dialog
    this.refs.dobDialog.open({
      date: dobDate,
      mode : 'default',
      maxDate: new Date() //To restirct future date
    });

  }

  /**
   * Call back for dob date picked event
   *
   */
  onDOBDatePicked = (date) => {
    this.setState({
      dobDate: date,
      dobText: moment(date).format('DD MMM, YYYY')
    });
  }


  /**
   * Journey date textbox click listener
   */
  onJourneyDatePress = () => {
    let journeyDate = this.state.journeyDate;

    if(!journeyDate || journeyDate == null){
      journeyDate = new Date();
      this.setState({
        journeyDate: journeyDate
      });
    }

    //To open the dialog
    this.refs.journeyDialog.open({
      date: journeyDate,
      minDate: new Date() //To restirct past date
    });

  }

  /**
   * Call back for journey date picked event
   *
   */
  onJourneyDatePicked = (date) => {
    this.setState({
      journeyDate: date,
      journeyText: moment(date).format('DD MMM, YYYY')
    });
  }
  render() {
    return (
    <Image source={require('./images/bg.png')}
      style={styles.container}>
      <Animatable.View style={styles.bgContainer}>
        <Subheader text="Calculate Duration Between Two Dates" color="paperCyan" inset />
        <View style={{flex:1, marginTop:10}}>
          <View style={styles.inputDate}>
            <Avatar icon="cloud" backgroundColor="paperLightBlue"/><Text style={styles.textDate}> From Date</Text>
          </View>
          <TouchableOpacity onPress={this.onDOBPress.bind(this)} >
            <View style={styles.datePickerBox}>
              <Text style={styles.datePickerText}>{this.state.dobText}</Text>
            </View>
          </TouchableOpacity>

          <View style={{marginTop: 10}}>
            <Avatar icon="terrain" backgroundColor="paperLightBlue"/>
            <Text style={{paddingLeft: 40, paddingTop: 15}}> To Date</Text>
          </View>
          <TouchableOpacity onPress={this.onJourneyDatePress.bind(this)} >
            <View style={styles.datePickerBox}>
              <Text style={styles.datePickerText}>{this.state.journeyText}</Text>
            </View>
          </TouchableOpacity>

        </View>
        {/*check empty object*/}
        {(Object.keys(this.state.resultDate).length !== 0 && this.state.resultDate.constructor === Object) &&
          <View style={styles.bgResult}>
            <Text style={{padding: 10}}>
              Dates: {this.state.resultDate.dates}
            </Text>
            <Text style={{padding: 10}}>
              Hours: {this.state.resultDate.hours}
            </Text>
            <Text style={{padding: 10}}>
              Minutes: {this.state.resultDate.minutes}
            </Text>
            <Text style={{padding: 10}}>
              Seconds: {this.state.resultDate.seconds}
            </Text>
          </View>
        }
        
        {/* Place the dialog component at end of your views and assign the references, event handlers to it.*/}
        <DatePickerDialog ref="dobDialog" onDatePicked={this.onDOBDatePicked.bind(this)} />
        <DatePickerDialog ref="journeyDialog" onDatePicked={this.onJourneyDatePicked.bind(this)} />

        { this.state.dobText != '' &&
          <Button text="SUBMIT" raised={true} onPress={()=> this.onPressCountDate(this.state.dobDate, this.state.journeyDate)} />
        }
        {/*<Subheader text="Author: tpason529" color="paperLime" inset />*/}
      </Animatable.View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10
  },
  content: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  datePickerBox:{
    marginTop: 9,
    borderColor: '#ABABAB',
    borderWidth: 0.5,
    padding: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    height: 38,
    justifyContent:'center'
  },
  datePickerText: {
    fontSize: 14,
    marginLeft: 5,
    borderWidth: 0,
    borderColor: '#7FDBFF',
    color: '#121212',
  },
  inputDate: {
    marginBottom: 0
  },
  textDate: {
    paddingLeft: 40,
    paddingTop: 15,
  },
  bgResult: {
    backgroundColor: 'rgba(57, 204, 204, 0.8)'
  }
});

AppRegistry.registerComponent('countDates', () => countDates);
