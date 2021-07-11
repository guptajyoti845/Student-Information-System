import {createAction, props} from '@ngrx/store';
import {SchoolClass} from '../../../entity/schoolClass';

export const SchoolClassesLoaded = createAction('[School Classes API] School Classes Loaded Successfully', props<{ schoolClasses: SchoolClass[] }>());

export const SchoolClassEnter = createAction('[School Classes Page] Enter');
