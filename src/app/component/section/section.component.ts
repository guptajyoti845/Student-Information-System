import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Section} from '../../entity/schoolClass';
import {SchoolService} from '../../service/SchoolClass.service';
import {ToasterService} from '../../service/toaster.service';

@Component({
  selector: 'app-section-list',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  // @ts-ignore
  @Input() schoolClassName: string;

  @Output()
  updateSectionList = new EventEmitter<Section[]>();

  _sections: Section[] = [];

  sectionExpandState: { [key: string]: boolean } = {};

  constructor(private schoolService: SchoolService, private toaster: ToasterService) {
  }

  showErrorToaster(error: string) {
    this.toaster.show('error', 'Something went Wrong in Section');
  }


  ngOnInit(): void {
    // @ts-ignore
    const currentClass = JSON.parse(localStorage.getItem('classes')).find(item => item.name === this.schoolClassName);

    if (currentClass.sections.length === 0) {
      this.schoolService.getSortedSections(this.schoolClassName).subscribe(sections => {
        sections.forEach(section => {

          const _section: Section = {name: section, students: []};

          this._sections.push(_section);

          this.sectionExpandState[_section.name] = false;

        });
        this.updateSectionList.emit(this._sections);

      }, (error) => {
        this.showErrorToaster(error);
      });
    } else {
      this._sections = currentClass.sections;
      currentClass.sections.forEach((section: Section) => {
        this.sectionExpandState[section.name] = false;
      });

    }

  }


  onSectionClick(event: any, index: number, sectionName: string): void {
    this.sectionExpandState[sectionName] = !this.sectionExpandState[sectionName];

    this._toggleAccordian(event, sectionName);
  }

  private _toggleAccordian(event: any, sectionName: string) {
    const element = event.target;
    element.classList.toggle('active');
    // @ts-ignore
    const section: Section = this._sections.find(section => section.name === sectionName);
    if (section.isActive) {
      section.isActive = false;
    } else {
      section.isActive = true;
    }

    const panel = element.nextElementSibling;
    if (panel.style.display == 'block') {
      panel.style.display = 'none';
    } else {
      panel.style.display = 'block';
    }

  }

}
