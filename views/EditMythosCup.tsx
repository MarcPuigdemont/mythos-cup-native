import React from 'react';

import { updateCup } from '../actions/cups';
import MythosCupForm from '../components/MythosCupForm';
import { useMappedState } from 'redux-react-hook';

const EditMythosCup = (props) => {
  const mapState = state => state.currentCup;
  let cup = useMappedState(mapState) || {};
  return (
    <MythosCupForm action={updateCup} cup={cup} {...props}/>
  );
};
EditMythosCup.navigationOptions = { title: 'Edit Mythos Cup' };

export default EditMythosCup;