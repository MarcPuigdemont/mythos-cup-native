import { ADD_CUP, UPDATE_CUP, REMOVE_CUP, REMOVE_ALL } from '.';

export function addCup(cup) {
  return {
    type: ADD_CUP,
    cup
  };
}

export function updateCup(cup) {
  return {
    type: UPDATE_CUP,
    cup
  };
}

export function removeCup(cup) {
  return {
    type: REMOVE_CUP,
    cup
  };
}

export function removeAll() {
  return {
    type: REMOVE_ALL
  };
}
