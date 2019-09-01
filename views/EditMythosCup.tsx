import React from 'react';
import { useMappedState } from 'redux-react-hook';

import { ICup } from '../interfaces';

import MythosCupForm from '../components/MythosCupForm';

import { updateCup } from '../actions/cups';

const EditMythosCup = (props) => {
  let cup: ICup = useMappedState(state => state.currentCup) || {};
  return (
    <MythosCupForm action={updateCup} cup={cup} {...props}/>
  );
};
EditMythosCup.navigationOptions = { title: 'Edit Mythos Cup' };

export default EditMythosCup;