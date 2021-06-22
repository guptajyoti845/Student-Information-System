import {Component, Input, OnInit} from '@angular/core';
import {SchoolClass, Section} from '../../entity/schoolClass';
import {SchoolService} from '../../service/SchoolClass.service';

@Component({
  selector: 'app-section-list',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  // @ts-ignore
  @Input() sections: Section[];

  // @ts-ignore
  @Input() schoolClasses: SchoolClass[];

  // @ts-ignore
  @Input() schoolClass: SchoolClass;

  // @ts-ignore
  // tslint:disable-next-line:variable-name
  _schoolClasses: SchoolClass[];

  constructor(private schoolService: SchoolService) {
  }

  ngOnInit(): void {
    this._schoolClasses = this.schoolClasses;
  }

  onSectionClick(className: string, sectionName: string): void {
    const classId = +className;
    this.schoolService.getStudentForSection(classId, sectionName).subscribe(students => {

      // @ts-ignore
      this._schoolClasses[classId - 1].sections.forEach(section => {
        if (section.name === sectionName) {
          section.students = students;
        }
      });
    });
  }

}
