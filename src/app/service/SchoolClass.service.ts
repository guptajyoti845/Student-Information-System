import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Student} from '../entity/schoolClass';


@Injectable()
export class ClassService {
  private url = 'https://tw-student-information-system-v1.vercel.app';

  constructor(private httpClient: HttpClient) {
  }

  getClasses(): Observable<string[]> {
    const classURL = `${this.url}/api/school/classes`;
    return this.httpClient.get<GetClassResponse>(classURL).pipe(
      map(response => response.classes)
    );
  }

  getSectionForClass(classId: string): Observable<string[]> {
    const sectionURL = `${this.url}/api/school/classes/${classId}/sections`;
    return this.httpClient.get<GetSectionResponse>(sectionURL).pipe(
      map(response => response.sections)
    );
  }

  getStudentForSection(classId: number, sectionId: string): Observable<Student[]> {

    const studentURL = `${this.url}/api/school/classes/${classId}/sections/${sectionId}`;
    return this.httpClient.get<GetStudentResponse>(studentURL).pipe(
      map(response => response.students)
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
