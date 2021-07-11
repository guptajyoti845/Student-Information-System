import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import * as fromSchoolClasses from '../component/school-class/reducer/schoolClasses.reducer';

export interface State {
  schoolClasses: fromSchoolClasses.State;
}

export const reducers: ActionReducerMap<State> = {
  schoolClasses: fromSchoolClasses.reducer
};

export const metaReducers: MetaReducer<State>[] = [];

