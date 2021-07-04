import {Component, Input, OnInit} from '@angular/core';
import {ToasterService} from '../../service/toaster.service';
import {Toast} from '../../service/toaster.interface';

@Component({
  selector: 'app-toaster-container',
  templateUrl: './toaster-container.component.html',
  styles: []
})
export class ToasterContainerComponent implements OnInit {

  toasts: Toast[] = [];

  constructor(public toaster: ToasterService) {
  }

  ngOnInit() {
    this.toaster.toast$
      .subscribe(toast => {
        this.toasts = [toast, ...this.toasts];
        setTimeout(() => this.toasts.pop(), toast.delay || 6000);
      });
  }

  remove(index: number) {
    this.toasts = this.toasts.filter((v, i) => i !== index);
    //this.toasts.splice(index, 1);
  }
}
