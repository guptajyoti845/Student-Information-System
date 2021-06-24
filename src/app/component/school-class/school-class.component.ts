import {Component, OnInit} from '@angular/core';
import {SchoolService} from '../../service/SchoolClass.service';
import {SchoolClass, Section} from '../../entity/schoolClass';

@Component({
  selector: 'app-school-class-list',
  templateUrl: './school-class.component.html',
  styleUrls: ['./school-class.component.scss']
})
export class SchoolClassComponent implements OnInit {

  constructor(private schoolService: SchoolService) {
  }

  schoolClasses: SchoolClass[] = [];
  schoolAPICall: { [key: string]: boolean } = {};

  ngOnInit(): void {
    this.schoolService.getSortedClasses().subscribe((schoolClasses) => {
      schoolClasses.forEach((schoolClass) => {
        const scClass: SchoolClass = {name: schoolClass, sections: []};
        this.schoolClasses.push(scClass);
      });
    });
  }

  onClassClick(schoolClassName: string): void {
    if (this.schoolAPICall[schoolClassName]) {
      return;
    }
    this.schoolAPICall[schoolClassName] = true;
    const classId = +schoolClassName;

    this.schoolService.getSortedSections(schoolClassName).subscribe(sections => {
      sections.forEach(section => {

        // tslint:disable-next-line:variable-name
        const _section: Section = {name: section, students: []};

        // @ts-ignore
        this.schoolClasses[classId - 1].sections.push(_section);
      });
    });

  }
}
