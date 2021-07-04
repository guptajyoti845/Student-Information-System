import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Student} from './entity/schoolClass';
import {MatDrawer} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // @ts-ignore
  @ViewChild('drawer') drawer: MatDrawer;

  // @ts-ignore
  studentForm: FormGroup;

  // @ts-ignore
  student: Student;


  ngOnInit(): void {

  }

  onSubmit() {
    this.drawer.toggle();
    if (!(this.studentForm.value.sports instanceof Array)) {
      this.student = {...this.student, sports: [...this.studentForm.value.sports.split(',')]};
    }
    this.student = {
      ...this.student,
      name: this.studentForm.value.username.trim(),
      age: this.studentForm.value.age,
      gender: this.studentForm.value.gender.trim(),
      sports: this.student.sports.map(sport => sport.trim())
    };

    console.log('updated student', this.student);

  }

  getStudent(student: Student) {
    this.student = student;
    this.studentForm = new FormGroup({
      'username': new FormControl(this.student.name),
      'gender': new FormControl(this.student.gender),
      'age': new FormControl(this.student.age),
      'sports': new FormControl(this.student.sports)
    });
    this.drawer.toggle();
  }
}
