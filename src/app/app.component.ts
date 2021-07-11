import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Student} from './entity/schoolClass';
import {MatDrawer} from '@angular/material/sidenav';
import {SchoolService} from './service/SchoolClass.service';
import {Subject} from 'rxjs';
import {LoaderService} from './service/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoading$: Subject<boolean> = this.loader.isLoading;

  // @ts-ignore
  @ViewChild('drawer') drawer: MatDrawer;

  // @ts-ignore
  studentForm: FormGroup;

  // @ts-ignore
  student: Student;

  constructor(private service: SchoolService, private loader: LoaderService) {
  }

  ngOnInit(): void {
    this.service.getStudent().subscribe(student => {
      this.getStudent(student);
    });

  }

  onSubmit() {
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

    this.service.sendStudent(this.student);

    this.drawer.close();

  }

  private getStudent(student: Student) {
    this.student = student;
    this.studentForm = new FormGroup({
      'username': new FormControl(this.student.name),
      'gender': new FormControl(this.student.gender),
      'age': new FormControl(this.student.age),
      'sports': new FormControl(this.student.sports)
    });
    this.drawer.open();
  }
}
