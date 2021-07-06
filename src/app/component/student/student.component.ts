import {Component, Input, OnInit} from '@angular/core';
import {Section, Student} from '../../entity/schoolClass';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  // @ts-ignore
  public currentStudent: Student;

  public sidebarShow: boolean = false;

  // @ts-ignore
  @Input() section: Section;

  constructor() {
  }

  ngOnInit(): void {
  }

  onStudentClick(student: Student) {
    this.sidebarShow = !this.sidebarShow;
    this.currentStudent = student;
  }
}
