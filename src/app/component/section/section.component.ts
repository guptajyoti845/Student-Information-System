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
  _schoolClasses: SchoolClass[];

  studentsAPICall: { [key: string]: boolean } = {};

  constructor(private schoolService: SchoolService) {
  }

  ngOnInit(): void {
    this._schoolClasses = this.schoolClasses;
  }

  onSectionClick(event: any, index: number, className: string, sectionName: string): void {

    if (this.studentsAPICall[className + sectionName]) {
      this._toggleAccordian(event, className, sectionName);
      return;
    }
    this.studentsAPICall[className + sectionName] = true;
    const classId = +className;
    this.schoolService.getSortedStudents(classId, sectionName).subscribe(students => {

      this._schoolClasses[classId - 1].sections.forEach(section => {
        if (section.name === sectionName) {
          section.students = students;
        }
      });

      setTimeout(() => {
        this._toggleAccordian(event, className, sectionName);
      }, 0);
    });
  }

  private _toggleAccordian(event: any, className: string, sectionName: string) {
    const element = event.target;
    element.classList.toggle('active');
    const schoolClass = this._schoolClasses.find(schoolClass => schoolClass.name === className);
    // @ts-ignore
    const section: Section = schoolClass.sections.find(section => section.name === sectionName);
    if (section.isActive) {
      section.isActive = false;
    } else {
      section.isActive = true;
    }

    const panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }

  }
}
