import {Component, Input, OnInit} from '@angular/core';
import {Student} from '../../entity/schoolClass';
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
    this.schoolService.getStudent().subscribe(val => {
      this._updateStudent(val);
    });
    this.schoolService.getSortedStudents((+this.className), this.sectionName).subscribe(students => {
      this._students = students;

    }, (error) => {
      this.showErrorToaster();
    });
  }

  showErrorToaster() {
    this.toaster.show('error', 'Something went Wrong');
  }


  onStudentClick(student: Student) {
    this.schoolService.sendStudent(student);
  }

  private _updateStudent(updatedStudent: Student) {

    this._students = this._students.map(student => {
      if (student.rollNumber === updatedStudent.rollNumber) {
        student = {...updatedStudent};
      } else {
        student = student;
      }

      return student;
    });

  }
}
