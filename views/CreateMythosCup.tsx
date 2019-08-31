import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  title: {
    marginTop: 20,
  }
});

const CreateMythosCup = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title} h3>CreateMythosCup</Text>    
    </View>
  );
};
CreateMythosCup.navigationOptions = { title: 'Create Mythos Cup' };

export default CreateMythosCup;