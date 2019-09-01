import { AsyncStorage } from 'react-native';

export const loadState = async () => {
  try {
    const serializedState = await AsyncStorage.getItem('@MythosCupNative:state');
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error parsing state');
    return {};
  }
};

export const saveState = async state => {
  try {
    const serializedState = JSON.stringify(state);
    await AsyncStorage.setItem('@MythosCupNative:state', serializedState);
  } catch (error) {
    console.error('Error saving state');
  }
};
