import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';

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

const MythosCupsList = (props) => {
  const { navigate } = props.navigation;
  return (
    <View style={styles.container}>
      <Text style={styles.title} h3>MythosCupsList</Text>
      <Button title="Play" onPress={() => navigate('PlayMythosCup', { cup: {} })} />
    </View>
  );
};
MythosCupsList.navigationOptions = { title: 'Mythos Cups' };

export default MythosCupsList;