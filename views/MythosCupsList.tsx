import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useMappedState } from 'redux-react-hook';

import MythosListItemButtons from '../components/MythosListItemButtons';
import ICONS from '../utils/icons';

const cups = [
  {
    campaign: 'Fest for Umorhoth',
    difficulty: 'Easy',
    icon: 2,
  },
  {
    campaign: 'Fest for Umorhoth',
    difficulty: 'Not that hard',
    icon: 4,
  },
  {
    campaign: 'Whispers in the dark',
    difficulty: 'Hard',
    icon: 7,
  },
];

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

const MythosCupsList = (props) => {
  const { navigate } = props.navigation;
  const mapState = state => state.cups;
  let cups = useMappedState(mapState) || [];
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {
          cups.map((cup, i) => {
            return (
              <ListItem
                key={i}
                leftAvatar={{ source: ICONS[cup.icon], avatarStyle: styles.avatar, rounded: false }}
                title={cup.campaign}
                subtitle={cup.difficulty}
                rightElement={(
                  <MythosListItemButtons edit={() => navigate('Settings', { cup })} play={() => navigate('PlayMythosCup', { cup })} />
                )}
              />
            )
          })
        }
      </View>
    </View>
  );
};
MythosCupsList.navigationOptions = { title: 'Mythos Cups' };

export default MythosCupsList;