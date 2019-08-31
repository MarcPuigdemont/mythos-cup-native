import React, { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { useDispatch } from 'redux-react-hook';

import { addCup } from '../actions/cups';

import CreateMythosCupIcons from '../components/CreateMythosCupIcons';

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
  text: {
    fontSize: 16,
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    color: '#86939e',
    alignSelf: "flex-start",
    marginLeft: 10,
    marginBottom: 20,
  },
});

const CreateMythosCup = (props) => {
  const { navigate } = props.navigation;
  const [ campaign, setCampaign ] = useState('');
  const [ difficulty, setDifficulty ] = useState('');
  const [ icon, selectIcon ] = useState(0);
  const dispatch = useDispatch();
  const handleAddCup = useCallback(() => {
    dispatch(addCup({ campaign, difficulty, icon }));
    setCampaign('');
    setDifficulty('');
    selectIcon(0);
    navigate('MythosCupsList');
  }, [campaign, difficulty, icon]);
  return (
    <View style={styles.container}>
      <Input containerStyle={styles.input} label='Which scenario are you playing' onChangeText={setCampaign} value={campaign} />
      <Input containerStyle={styles.input} label='Which difficulty are you playing on' onChangeText={setDifficulty} value={difficulty} />
      <Text style={styles.text}>Give it an icon to represent the campaign</Text>
      <CreateMythosCupIcons selected={icon} onSelect={selectIcon} />
      <Button title="Create" onPress={handleAddCup} />
    </View>
  );
};
CreateMythosCup.navigationOptions = { title: 'Create Mythos Cup' };

export default CreateMythosCup;