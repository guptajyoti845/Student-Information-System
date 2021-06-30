import {BehaviorSubject} from 'rxjs';

export interface Student {
  id:string;
  name: string;
  class?: number;
  gender: string;
  section?: string;
  rollNumber?: number;
  sports: string[];
  age: number;
}

export interface Section {
  id: string;
  name: string;
  students: Student[];
  className: string;
}

export interface SchoolClass {
  id:string;
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
    public hasChildren = false,
    public loadMoreParentItem: string | null = null
  ) {
  }
}

/** Flat node with expandable and level information */
export class LoadMoreFlatNode {
  constructor(
    public item: SchoolClass | Student | Section,
    public level = 1,
    public expandable = false,
    public loadMoreParentItem: string | null = null,
  ) {
  }
}

export enum Type {
  Class,
  Section,
  Student
}
