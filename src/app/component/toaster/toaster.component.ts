import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Toast} from '../../service/toaster.interface';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls:['./toaster.component.scss']
})
export class ToasterComponent {
  // @ts-ignore
  @Input() toast: Toast;

  // @ts-ignore
  @Input() i: number;

  @Output() remove = new EventEmitter<number>();
}
