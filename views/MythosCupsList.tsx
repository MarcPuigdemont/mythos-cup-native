import React from 'react';
import { StyleSheet, View, TouchableHighlight  } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useMappedState, useDispatch } from 'redux-react-hook';

import { ICup } from '../interfaces';

import ICONS from '../utils/icons';

import MythosListItemButtons from '../components/MythosListItemButtons';
import { setCurrentCup } from '../actions/currentCup';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    padding: 20,
    backgroundColor: '#fff',
  },
  list: {
    flex: 1,
    alignItems: 'stretch',
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  avatar: {
    backgroundColor: '#fff',
  },
});

interface Props {
  navigation: { navigate: Function };
}
const MythosCupsList = (props: Props) => {
  const { navigate } = props.navigation;
  let cups: ICup[] = useMappedState(state => state.cups) || [];
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {
          cups.map((cup, i) => {
            return (
              <TouchableHighlight key={i} onPress={() => { dispatch(setCurrentCup(cup)); navigate('PlayMythosCup'); }} underlayColor={'#fff'}>
                <ListItem
                  leftAvatar={{ source: ICONS[cup.icon], avatarStyle: styles.avatar, rounded: false }}
                  title={cup.campaign}
                  subtitle={cup.difficulty}
                  rightElement={(
                    <MythosListItemButtons 
                      edit={() => { dispatch(setCurrentCup(cup)); navigate('EditMythosCup')}}
                      tokens={() => { dispatch(setCurrentCup(cup)); navigate('ConfigureMythosCup')}} />
                  )}
                />
              </TouchableHighlight>
            )
          })
        }
      </View>
    </View>
  );
};
MythosCupsList.navigationOptions = { title: 'Mythos Cups' };

export default MythosCupsList;