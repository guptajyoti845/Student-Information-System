import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Student} from '../entity/schoolClass';

@Injectable()
export class SchoolService {
  private baseURL = 'https://tw-student-information-system-v1.vercel.app';

  constructor(private httpClient: HttpClient) {
  }

  getSortedClasses(): Observable<string[]> {

    const classURL = `${this.baseURL}/api/school/classes`;

    return this.httpClient.get<GetClassResponse>(classURL).pipe(
      map(response => response.classes),
      map(arr => arr.sort((a: string, b: string) => Number(b) - Number(a)))
    );
  }

  getSortedSections(classId: string): Observable<string[]> {

    const sectionURL = `${this.baseURL}/api/school/classes/${classId}/sections`;
    return this.httpClient.get<GetSectionResponse>(sectionURL).pipe(
      map(response => response.sections),
      map(arr => arr.sort())
    );
  }

  getSortedStudents(classId: number, sectionId: string): Observable<Student[]> {

    const studentURL = `${this.baseURL}/api/school/classes/${classId}/sections/${sectionId}`;
    return this.httpClient.get<GetStudentResponse>(studentURL).pipe(
      map(response => response.students),
      map(arr => arr.sort((a: Student, b: Student) => {

        // @ts-ignore
        const nameA = a.name.toUpperCase();

        // @ts-ignore
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;

      }))
    );
  }
}

interface GetClassResponse {
  classes: string[];
}

interface GetSectionResponse {
  sections: string[];
}

interface GetStudentResponse {
  students: Student[];
}
