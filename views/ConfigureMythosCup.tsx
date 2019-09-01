import React, { useCallback } from 'react';
import { StyleSheet, View  } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { useMappedState, useDispatch } from 'redux-react-hook';

import { ICup, IToken } from '../interfaces';

import ICONS from '../utils/icons';

import Token from '../components/Token';

import { updateCup } from '../actions/cups';
import { setCurrentCup } from '../actions/currentCup';

const iconSize = 64;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 18,
  },
  cupContainer: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  cupTextContainer: {
    flexDirection: 'column',
  },
  cupCampaign: {
    fontSize: 26,
  },
  cupDifficulty: {
    fontSize: 22,
    color: '#ccc'
  },
  tokensContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    flexWrap: "wrap",
    marginTop: 10,
  },
  icon: {
    backgroundColor: '#fff',
    marginRight: 10,
    maxWidth: iconSize,
    maxHeight: iconSize,
  }
});

const initialTokens: IToken[] = [
  { name: 'Spawn clue', image: 'clue', count: 0 },
  { name: 'Spread doom', image: 'doom', count: 0 },
  { name: 'Portal bursts', image: 'portal', count: 0 },
  { name: 'Spawn monster', image: 'monster', count: 0 },
  { name: 'Headline', image: 'headline', count: 0 },
  { name: 'Reckoning', image: 'reckoning', count: 0 },
  { name: 'Empty', image: 'empty', count: 0 }
];

const ConfigureMythosCup = () => {
  const cup: ICup = useMappedState(state => state.currentCup) || {};
  if (!cup.tokens) cup.tokens = initialTokens;
  
  const dispatch = useDispatch();
  const updateToken = useCallback((index: number, value: number) => {
    const count = Math.max(0, value);
    const newCup = { ...cup };
    newCup.tokens = cup.tokens.map((t, i) => i === index ? { ...t, count } : t);
    dispatch(updateCup(newCup));
    dispatch(setCurrentCup(newCup));
  }, [cup]);
  
  return (
    <View style={styles.container}>
      <View style={styles.cupContainer}>
        <Image source={ICONS[cup.icon]} style={styles.icon} />
        <View style={styles.cupTextContainer}>
          <Text style={styles.cupCampaign}>{cup.campaign}</Text>
          <Text style={styles.cupDifficulty}>{cup.difficulty}</Text>
        </View>
      </View>
      <View style={styles.tokensContainer}>
        {
          cup.tokens.map((token, index) => {
            return (
              <Token
                key={index}
                token={token}
                onChange={(val) => updateToken(index, val)}
              />
            )
          })
        }
      </View>
    </View>
  );
};
ConfigureMythosCup.navigationOptions = { title: 'Configure Mythos Cup' };

export default ConfigureMythosCup;
