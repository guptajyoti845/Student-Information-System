import {Component, Input, OnInit} from '@angular/core';
import {SchoolClass, Section, Student} from '../../entity/schoolClass';
import {SchoolService} from '../../service/SchoolClass.service';
import {ToasterService} from '../../service/toaster.service';

@Component({
    selector: 'app-section-list',
    templateUrl: './section.component.html',
    styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

    // @ts-ignore
    //@Input() sections: Section[];

    // @ts-ignore
    //@Input() schoolClasses: SchoolClass[];

    // @ts-ignore
    @Input() schoolClassName: string;

    _sections: Section[] = [];

    sectionExpandState: { [key: string]: boolean } = {};


    studentsAPICall: { [key: string]: boolean } = {};

    constructor(private schoolService: SchoolService, private toaster: ToasterService) {
    }

    showErrorToaster() {
        this.toaster.show('error', 'Something went Wrong');
    }


    ngOnInit(): void {


        const classId = +this.schoolClassName;

        this.schoolService.getSortedSections(this.schoolClassName).subscribe(sections => {
            sections.forEach(section => {

                const _section: Section = {name: section, students: []};

                this._sections.push(_section);

                this.sectionExpandState[_section.name] = false;

            });

            // setTimeout(() => {
            //     this._toggleAccordian(event, schoolClassName);
            // }, 0);

        }, (error) => {
            this.showErrorToaster();
        });


        // this.schoolService.getStudent().subscribe(student => {
        //     this._updateStudent(student);
        // });
    }

    onSectionClick(event: any, index: number, sectionName: string): void {
        this.sectionExpandState[sectionName] = !this.sectionExpandState[sectionName];

        this._toggleAccordian(event, sectionName);
        // if (this.studentsAPICall[className + sectionName]) {
        //     this._toggleAccordian(event, sectionName);
        //     return;
        // }

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
