import {SchoolClass} from '../../../entity/schoolClass';
import {Action, createReducer, on} from '@ngrx/store';
import {SchoolClassAction} from '../action';

export interface State {
  collection: SchoolClass[];
}

export const initialState: State = {
  collection: []
};

export const SchoolClassesReducer = createReducer(
  initialState,
  on(SchoolClassAction.SchoolClassEnter, (state, action) => {
    return {
      ...state
    };
  }),
  on(SchoolClassAction.SchoolClassesLoaded, (state, action) => {
    return {
      collection: action.schoolClasses
    };
  })
);


export function reducer(state: undefined | State, action: Action) {
  return SchoolClassesReducer(state, action);
}
