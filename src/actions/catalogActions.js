import {SET_CATEGORY, RESET_CATEGORY, SET_SEARCH_MOD } from './Types/catalogActionTypes';

const setCurrentCategory = (payload) => ({ type: SET_CATEGORY, payload })
const resetCurrentCategory = () => ({ type: RESET_CATEGORY })
const setSearchMod = (payload) => ({ type: SET_SEARCH_MOD, payload})


export const SetCategory = (Id) => dispatch => {
    dispatch(setCurrentCategory(Id))
}

export const ResetCategory = () => dispatch => {
    dispatch(resetCurrentCategory())
}

export const SetSearchMod = (string) => dispatch => {
    dispatch(setSearchMod(string))
}