import React, { useState, useEffect, useCallback } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useMappedState, useDispatch } from 'redux-react-hook';

import { ICup, IToken } from '../interfaces';

import ICONS from '../utils/icons';
import TokenPlay from '../components/TokenPlay';
import { updateCup } from '../actions/cups';

const screenWidth = Math.round(Dimensions.get('window').width);
const iconSize = 64;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  noTokens: {
    marginHorizontal: 20,
    fontSize: 32,
  },
  cupContainer: {
    flexDirection: 'row',
    marginBottom: 20,
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
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flexWrap: 'wrap',
    position: 'relative',
    marginTop: 10,
    
    borderStyle: 'dashed',
    borderWidth: 2,
    borderRadius: 20,
  },
  highLight: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    
    minWidth: screenWidth - 40,
    minHeight: screenWidth - 40,
  },
  icon: {
    backgroundColor: '#fff',
    marginRight: 10,
    maxWidth: iconSize,
    maxHeight: iconSize,
  },
  revealedTokensContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 0,
    marginLeft: 35,
    marginRight: 20,
    minHeight: 60,
  },
  unRevealedTokensContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    marginLeft: 35,
    marginRight: 20,
    minHeight: 60,
  },
  revealText: {
    marginTop: 20,
    fontSize: 24,
  }
});

const Play = () => {
  const dispatch = useDispatch();
  const cup: ICup = useMappedState(state => state.currentCup) || {};
  if (!cup.tokens) {
    return (
      <View style={styles.container}>
        <Text style={styles.noTokens}>No tokens to play! Configure the cup in order to play!</Text>
      </View>
    );
  }

  const [revealedTokens, setRevealedTokens] = useState(cup.revealedTokens || []);
  const [unRevealedTokens, setUnRevealedTokens] = useState(cup.unRevealedTokens || []);
  // Build the play cup if necessary
  useEffect(() => {
    const tokenCount = cup.tokens.reduce((acc, t) => acc + t.count, 0);
    // if the number of tokens has changed, rebuild
    if (cup.playTokens && tokenCount !== cup.playTokens.length) {
      cup.playTokens = undefined;
    }
    if (!cup.playTokens) {
      cup.playTokens = cup.tokens.flatMap(token =>
        Array.from({ length: token.count }, () => ({
          name: token.name,
          image: token.image
        }))
      );
    }
    if (!unRevealedTokens.length && !revealedTokens.length) {
      setUnRevealedTokens([...cup.playTokens]);
      setRevealedTokens([]);
    }
  }, [cup]);

  const reveal = useCallback(() => {
    if (unRevealedTokens.length == 0) {
      setUnRevealedTokens([...cup.playTokens]);
      setRevealedTokens([]);
    } else {
      const randomNumber = Math.floor(Math.random() * unRevealedTokens.length);
      const token = unRevealedTokens[randomNumber];
      const newUnRevealedTokens = unRevealedTokens.filter(t => t !== token);
      const newRevealedTokens = [...revealedTokens, token];
      setUnRevealedTokens(newUnRevealedTokens);
      setRevealedTokens(newRevealedTokens);
      dispatch(
        updateCup({
          ...cup,
          unRevealedTokens: newUnRevealedTokens,
          revealedTokens: newRevealedTokens
        })
      );
    }
  }, [cup, unRevealedTokens, revealedTokens]);

  return (
    <View style={styles.container}>
      <View style={styles.cupContainer}>
        <Image source={ICONS[cup.icon]} style={styles.icon} />
        <View style={styles.cupTextContainer}>
          <Text style={styles.cupCampaign}>{cup.campaign}</Text>
          <Text style={styles.cupDifficulty}>{cup.difficulty}</Text>
        </View>
      </View>
      <View style={styles.revealedTokensContainer}>
        { revealedTokens.map((t: IToken, i) => <TokenPlay key={i} token={t} size={40} marginLeft={-35} />) }
      </View>
      <View style={styles.unRevealedTokensContainer}>
        { unRevealedTokens.map((t: IToken, i) => <TokenPlay key={i} token={t} size={40} marginLeft={-35} opacity={0.5} />) }
      </View>
      <Text style={styles.revealText}>Reveal a Token!</Text>
      <View style={styles.tokensContainer}>
        <TouchableOpacity  style={styles.highLight} onPress={reveal}>
          {revealedTokens.length > 0 && (
            <TokenPlay token={revealedTokens[revealedTokens.length - 1]} size={80} />
          )}
        </TouchableOpacity >
      </View>
    </View>
  );
};
Play.navigationOptions = { title: 'Play' };

export default Play;