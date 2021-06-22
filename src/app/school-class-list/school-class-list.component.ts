import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ClassService} from '../service/SchoolClass.service';
import {SchoolClass, Section, Student} from '../entity/schoolClass';
import {fromEvent} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-school-class-list',
  templateUrl: './school-class-list.component.html',
  styleUrls: ['./school-class-list.component.scss']
})
export class SchoolClassListComponent implements OnInit {

  students: Student[] = [];

  student: Student = {
    name: 'name', age: 10, gender: 'Male', sports: ['1', '2']
  };

  constructor(private classService: ClassService) {
  }

  schoolClasses: SchoolClass[] = [];
  condition = true;

  ngOnInit(): void {
    this.classService.getClasses().subscribe((schoolClasses) => {
      schoolClasses.forEach((schoolClass) => {
        const scClass: SchoolClass = {name: schoolClass, sections: []};
        this.schoolClasses.push(scClass);
      });
    });
  }

  onClassClick(schoolClassName: string): void {
    const classId = +schoolClassName;

    this.classService.getSectionForClass(schoolClassName).subscribe(sections => {
      sections.forEach(section => {

        // tslint:disable-next-line:variable-name
        const _section: Section = {name: section, students: []};

        // @ts-ignore
        this.schoolClasses[classId - 1].sections.push(_section);
      });
    });

  }

  onSectionClick(className: string, sectionName: string): void {
    const classId = +className;
    this.classService.getStudentForSection(classId, sectionName).subscribe(students => {
      this.students = students;

      // @ts-ignore
      this.schoolClasses[classId - 1].sections.forEach(section => {
        if (section.name === sectionName) {
          section.students = students;
        }
      });

      console.log('this.schoolClasses', this.schoolClasses);
    });
  }
}
