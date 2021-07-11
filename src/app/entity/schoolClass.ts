import {BehaviorSubject} from 'rxjs';

export interface Student {
  id: string;
  name: string;
  class?: number;
  gender: string;
  section?: string;
  rollNumber?: number;
  sports: string[];
  age: number;
}

export interface Section {
  isActive?: boolean;
  name: string;
  students: Student[];
}

export interface SchoolClass {
  isActive?: boolean;
  name: string;
  sections: Section[];
}

export class LoadMoreNode {
  childrenChange = new BehaviorSubject<LoadMoreNode[]>([]);

  get children(): LoadMoreNode[] {
    return this.childrenChange.value;
  }

  constructor(
    public item: SchoolClass | Student | Section,
    public hasChildren = false
  ) {
  }
}

export class LoadMoreFlatNode {
  constructor(
    public item: SchoolClass | Student | Section,
    public level = 1,
    public expandable = false
  ) {
  }
}

export enum Type {
  Class,
  Section,
  Student
}
