import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useMappedState, useDispatch } from 'redux-react-hook';

import { ICup, IToken, ITokenPlay } from '../interfaces';

import CupHeader from '../components/CupHeader';
import TokenPlay from '../components/TokenPlay';
import { updateCup } from '../actions/cups';

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
    
    minWidth: '100%',
    minHeight: '100%',
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
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  controlsButton: {
    minWidth: 120,
  }
});

interface Props {
  navigation: { navigate: Function };
}
const Play = (props) => {
  const { navigate } = props.navigation;
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

  const dispatch = useDispatch();
  const commitTokens = (newUnRevealedTokens: ITokenPlay[], newRevealedTokens: ITokenPlay[]) => {
    setUnRevealedTokens(newUnRevealedTokens);
    setRevealedTokens(newRevealedTokens);
    dispatch(
      updateCup({
        ...cup,
        unRevealedTokens: newUnRevealedTokens,
        revealedTokens: newRevealedTokens
      })
    );
  };

  const reveal = useCallback(() => {
    if (unRevealedTokens.length == 0) {
      commitTokens([...cup.playTokens], []);
    } else {
      const randomNumber = Math.floor(Math.random() * unRevealedTokens.length);
      const token = unRevealedTokens[randomNumber];
      const newUnRevealedTokens = unRevealedTokens.filter(t => t !== token);
      const newRevealedTokens = [...revealedTokens, token];
      commitTokens(newUnRevealedTokens, newRevealedTokens);
    }
  }, [cup, unRevealedTokens, revealedTokens]);

  const undo = useCallback(() => {
    if (revealedTokens.length === 0) {
      return;
    }

    const newRevealedTokens = revealedTokens;
    const token = newRevealedTokens.pop();
    const newUnRevealedTokens = [...unRevealedTokens, token];
    commitTokens(newUnRevealedTokens, newRevealedTokens);
  }, [cup, unRevealedTokens, revealedTokens]);

  return (
    <View style={styles.container}>
      <CupHeader cup={cup} />
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
      <View style={styles.controlsContainer}>
        <Button title={'Undo'} containerStyle={styles.controlsButton} onPress={undo} />
        <Button title={'Pictures'} containerStyle={styles.controlsButton} onPress={() => navigate('PicturesGallery')}/>
      </View>
    </View>
  );
};
Play.navigationOptions = { title: 'Play' };

export default Play;