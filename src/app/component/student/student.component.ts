import {Component, Input, OnInit} from '@angular/core';
import {SchoolClass, Section, Student} from '../../entity/schoolClass';
import {SchoolService} from '../../service/SchoolClass.service';
import {ToasterService} from '../../service/toaster.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  // @ts-ignore
  @Input() sectionName: string;

  // @ts-ignore
  @Input() className: string;

  // @ts-ignore
  _students: Student [];

  constructor(private schoolService: SchoolService, private toaster: ToasterService) {

  }

  ngOnInit(): void {
    // @ts-ignore
    const localState = JSON.parse(localStorage.getItem('classes'));
    const currentClassState = localState.find((item: SchoolClass) => item.name === this.className);
    const currentSectionState = currentClassState.sections.find((section: Section) => section.name === this.sectionName);

    if (currentSectionState.students.length === 0) {
      this.schoolService.getSortedStudents((+this.className), this.sectionName).subscribe(students => {
        this._students = students;
        this._updateStudentState(this._students);
      }, (error) => {
        this.showErrorToaster(error);
      });
    } else {
      this._students = currentSectionState.students;
    }

    this.schoolService.getStudent().subscribe(val => {
      this._updateStudent(val);
    });
  }

  showErrorToaster(error: Error) {
    this.toaster.show('error', 'Something went Wrong');
  }


  onStudentClick(student: Student) {
    this.schoolService.sendStudent(student);
  }

  private _updateStudent(updatedStudent: Student) {

    this._students = this._students.map(student => {
      if (student.rollNumber === updatedStudent.rollNumber) {
        student = {...updatedStudent};
      }
      return student;
    });

    this._updateStudentState(this._students);
  }

  private _updateStudentState(students: Student[]) {
    // @ts-ignore
    const localState: SchoolClass[] = JSON.parse(localStorage.getItem('classes'));

    const currentClassState = localState.find((item: SchoolClass) => item.name === this.className);

    const currentSectionState = currentClassState?.sections.find((section: Section) => section.name === this.sectionName);

    // @ts-ignore
    currentSectionState.students = students;

    localState.forEach(item => {
      if (item.name === currentClassState?.name) {
        item = {...currentClassState};
      }

    });

    localStorage.setItem('classes', JSON.stringify(localState));

  }
}
