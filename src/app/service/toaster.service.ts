import { Injectable } from '@angular/core';
import { Toast } from './toaster.interface';
import { ToastType } from './toaster.type';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class ToasterService {
  subject: BehaviorSubject<Toast>;
  toast$: Observable<Toast>;

  constructor() {
    // @ts-ignore
    this.subject = new BehaviorSubject<Toast>(null);
    this.toast$ = this.subject.asObservable()
      .pipe(filter(toast => toast !== null));
  }

  show(type: ToastType, title?: string, body?: string, delay?: number) {
    // @ts-ignore
    this.subject.next({ type, title, body, delay });
  }
}
