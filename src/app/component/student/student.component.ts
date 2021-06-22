import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Section, Student} from '../../entity/schoolClass';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
// @ts-ignore
  @ViewChild('student') currentStudent: Student;

  public sidebarShow: boolean = false;

  // @ts-ignore
  @Input() section: Section;

  constructor() {
  }

  ngOnInit(): void {
  }

}
