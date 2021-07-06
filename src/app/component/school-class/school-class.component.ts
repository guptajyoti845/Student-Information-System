import {Component, OnInit} from '@angular/core';
import {SchoolService} from '../../service/SchoolClass.service';
import {SchoolClass, Section} from '../../entity/schoolClass';
import {Subject} from 'rxjs';
import {LoaderService} from '../../service/loader.service';

@Component({
  selector: 'app-school-class-list',
  templateUrl: './school-class.component.html',
  styleUrls: ['./school-class.component.scss']
})
export class SchoolClassComponent implements OnInit {

  isLoading$: Subject<boolean> = this.loader.isLoading;

  constructor(private schoolService: SchoolService, private loader: LoaderService) {
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

  onClassClick(event: any, schoolClassName: string): void {
    if (this.schoolAPICall[schoolClassName]) {
      this._toggleAccordian(event, schoolClassName);
      return;
    }
    this.schoolAPICall[schoolClassName] = true;
    const classId = +schoolClassName;

    this.schoolService.getSortedSections(schoolClassName).subscribe(sections => {
      sections.forEach(section => {

        const _section: Section = {name: section, students: []};

        this.schoolClasses[classId - 1].sections.push(_section);

      });

      setTimeout(() => {
        this._toggleAccordian(event, schoolClassName);
      }, 0);

    });

  }

  private _toggleAccordian(event: any, schoolClassName: string) {
    const element = event.target;
    element.classList.toggle('schoolClasses__active');
    // @ts-ignore
    const schoolClass: SchoolClass = this.schoolClasses.find(schoolClass => schoolClass.name === schoolClassName);

    if (schoolClass.isActive) {
      schoolClass.isActive = false;
    } else {
      schoolClass.isActive = true;
    }

    const panel = element.nextElementSibling;
    if (panel.style.display === 'block') {
      panel.style.display = 'none';
    } else {
      panel.style.display = 'block';
    }

  }
}
