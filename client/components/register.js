import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet } from 'react-native';
import Amplify, { Auth } from 'aws-amplify';
import awsConfig from '../aws-exports';

Amplify.configure({
  Auth: awsConfig,
});

//Not Finished Add all Types from USER MODEL
export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      phone: '',
      password: '',
      errorMessage: '',
    };
  }

  onSignUp = () => {
    const { name, email, phone, password } = this.state;

    Auth.signUp({
      username: email,
      password: password,
      attributes: {
        email: email,
        phone_number: `+1${phone}`,
        name: name,
      },
    })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  render() {
    const { name, email, phone, password } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          value={name}
          onChangeText={(name) => this.setState({ name })}
          placeholder={'name'}
          style={styles.input}
        />
        <TextInput
          value={email}
          onChangeText={(email) => this.setState({ email })}
          placeholder={'email'}
          style={styles.input}
          textContentType="emailAddress"
        />
        <TextInput
          value={password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'password'}
          style={styles.input}
          textContentType="password"
          secureTextEntry={true}
        />
        <TextInput
          value={phone}
          onChangeText={(phone) => this.setState({ phone })}
          placeholder={'phone number'}
          style={styles.input}
          textContentType="telephoneNumber"
          keyboardType={'number-pad'}
        />

        <Button title={'Login'} style={styles.input} onPress={this.onSignUp} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});
