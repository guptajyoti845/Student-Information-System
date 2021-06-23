import {Component, Input, OnInit} from '@angular/core';
import {Student} from '../../entity/schoolClass';

@Component({
  selector: 'app-slide-drawer',
  templateUrl: './slide-drawer.component.html',
  styleUrls: ['./slide-drawer.component.scss']
})
export class SlideDrawerComponent implements OnInit {

  // @ts-ignore
  @Input() student: Student;

  // @ts-ignore
  @Input() sidebarShow: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
