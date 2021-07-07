import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Section, Student} from '../../entity/schoolClass';
import {SchoolService} from '../../service/SchoolClass.service';
import {ChangeDetection} from '@angular/cli/lib/config/schema';
import {ToasterService} from '../../service/toaster.service';

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit, OnChanges {

    // @ts-ignore
    @Input() sectionName: string;

    // @ts-ignore
    @Input() className: string;

    // @ts-ignore
    _students: Student [];

    constructor(private schoolService: SchoolService, private toaster: ToasterService) {

    }

    ngOnInit(): void {
        this.schoolService.getStudent().subscribe(val => {
            console.log('value changed', val);
            this._updateStudent(val);
        });
        this.schoolService.getSortedStudents((+this.className), this.sectionName).subscribe(students => {

            this._students = students;

        }, (error) => {
            this.showErrorToaster();
        });
    }

    showErrorToaster() {
        this.toaster.show('error', 'Something went Wrong');
    }


    onStudentClick(student: Student) {
        this.schoolService.sendStudent(student);
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('changes', changes);
    }

    private _updateStudent(updatedStudent: Student) {
        this._students.forEach(student => {
            if (student.rollNumber === updatedStudent.rollNumber) {
                student = {...updatedStudent};
            }
        });


    }
}
