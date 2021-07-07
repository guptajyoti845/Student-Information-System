import {Component, OnInit} from '@angular/core';
import {SchoolService} from '../../service/SchoolClass.service';
import {SchoolClass, Section} from '../../entity/schoolClass';
import {ToasterService} from '../../service/toaster.service';

@Component({
  selector: 'app-school-class-list',
  templateUrl: './school-class.component.html',
  styleUrls: ['./school-class.component.scss']
})
export class SchoolClassComponent implements OnInit {


  constructor(private toaster: ToasterService, private schoolService: SchoolService) {
  }

  schoolClasses: SchoolClass[] = [];
  schoolAPICall: { [key: string]: boolean } = {};
  classExpandState: { [key: string]: boolean } = {};

  showErrorToaster() {
    this.toaster.show('error', 'Something went Wrong');
  }

  ngOnInit(): void {
    this.schoolService.getSortedClasses().subscribe((schoolClasses) => {
      schoolClasses.forEach((schoolClass) => {
        const scClass: SchoolClass = {name: schoolClass, sections: []};
        this.schoolClasses.push(scClass);
        this.classExpandState[schoolClass] = false;
      });
    }, (error) => {
      this.showErrorToaster();
    });
  }

  onClassClick(event: any, schoolClassName: string): void {
    this.classExpandState[schoolClassName] = true;

    this._toggleAccordian(event, schoolClassName);
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

  updateSectionList(name: string, sections: Section[]) {
    const schoolClass = this.schoolClasses.find(schoolClass => schoolClass.name === name);
    // @ts-ignore
    schoolClass.sections = sections;
  }
}
