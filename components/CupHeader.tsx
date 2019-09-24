import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native-elements';

import ICONS from '../utils/icons';
import { ICup } from '../interfaces';

const styles = StyleSheet.create({
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
  icon: {
    backgroundColor: '#fff',
    marginRight: 10,
    maxWidth: 64,
    maxHeight: 64,
  },
});

interface Props {
  cup: ICup;
}
const CupHeader = (props: Props) => {
  const { cup } = props;
  return (
    <View style={styles.cupContainer}>
      <Image source={ICONS[cup.icon]} style={styles.icon} />
      <View style={styles.cupTextContainer}>
        <Text style={styles.cupCampaign}>{cup.campaign}</Text>
        <Text style={styles.cupDifficulty}>{cup.difficulty}</Text>
      </View>
    </View>
  );
};

export default CupHeader;