import {Component, Input, OnInit} from '@angular/core';
import {Student} from '../../entity/schoolClass';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-slide-drawer',
  templateUrl: './slide-drawer.component.html',
  styleUrls: ['./slide-drawer.component.scss']
})
export class SlideDrawerComponent implements OnInit {

  // @ts-ignore
  @Input() student: Student;

  // @ts-ignore
  @Input() sidebarShow: boolean;

  genders = ['male', 'female'];
  // @ts-ignore
  studentForm: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.studentForm = new FormGroup({
      'username': new FormControl(this.student.name),
      'gender': new FormControl(this.student.gender),
      'age': new FormControl(this.student.age),
      'sports': new FormControl(this.student.sports)
    });
  }

  onSubmit() {
    console.log(this.studentForm);
  }


}
