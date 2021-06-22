export class Student {
  name: string | undefined;
  class?: number | undefined;
  gender: string | undefined;
  section?: string | undefined;
  rollNumber?: number | undefined;
  sports: string[] | undefined;
  age: number | undefined;
}

export class Section {
  // @ts-ignore
  name: string;
  students?: Student[];
}

export class SchoolClass {
  // @ts-ignore
  name: string;
  sections?: Section[];
}
