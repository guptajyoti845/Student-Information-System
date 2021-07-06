import {Component, OnInit} from '@angular/core';
import {SchoolService} from '../../service/SchoolClass.service';
import {SchoolClass, Section} from '../../entity/schoolClass';
import {Subject} from 'rxjs';
import {LoaderService} from '../../service/loader.service';
import {ToasterService} from '../../service/toaster.service';

@Component({
  selector: 'app-school-class-list',
  templateUrl: './school-class.component.html',
  styleUrls: ['./school-class.component.scss']
})
export class SchoolClassComponent implements OnInit {

  isLoading$: Subject<boolean> = this.loader.isLoading;

  constructor(private toaster: ToasterService, private schoolService: SchoolService, private loader: LoaderService) {
  }

  schoolClasses: SchoolClass[] = [];
  schoolAPICall: { [key: string]: boolean } = {};
  classExpandState:{ [key: string]: boolean } = {};


  showErrorToaster() {
    this.toaster.show('error', 'Something went Wrong');
  }

  ngOnInit(): void {
    this.schoolService.getSortedClasses().subscribe((schoolClasses) => {
      schoolClasses.forEach((schoolClass) => {
        const scClass: SchoolClass = {name: schoolClass, sections: []};
        this.schoolClasses.push(scClass);
        this.classExpandState[schoolClass] =false;
      });
    }, (error) => {
      this.showErrorToaster();
    });
  }

  onClassClick(event: any, schoolClassName: string): void {
    this.classExpandState[schoolClassName] = !this.classExpandState[schoolClassName];
    this._toggleAccordian(event, schoolClassName);
/*
    if (this.schoolAPICall[schoolClassName]) {
      this._toggleAccordian(event, schoolClassName);
      return;
    }*/



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
