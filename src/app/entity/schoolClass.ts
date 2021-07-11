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
