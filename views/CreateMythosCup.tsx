import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 30,
  },
});

const CreateMythosCup = (props) => {
  return (
    <View style={styles.container}>
      <Input containerStyle={styles.input} label='Which scenario are you playing' />
      <Input containerStyle={styles.input} label='Which difficulty are you playing on' />
      <Button title="Create" />
    </View>
  );
};
CreateMythosCup.navigationOptions = { title: 'Create Mythos Cup' };

export default CreateMythosCup;