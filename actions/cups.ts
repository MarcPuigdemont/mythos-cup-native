import { ADD_CUP, UPDATE_CUP, REMOVE_CUP, REMOVE_ALL, SET_CUPS } from '.';
import { ICup } from '../interfaces';

export function addCup(cup: ICup) {
  return {
    type: ADD_CUP,
    cup
  };
}

export function updateCup(cup: ICup) {
  return {
    type: UPDATE_CUP,
    cup
  };
}

export function removeCup(cup: ICup) {
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

export function setCups(cups: ICup[]) {
  return {
    type: SET_CUPS,
    cups
  };
}
