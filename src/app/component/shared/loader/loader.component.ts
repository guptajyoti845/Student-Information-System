import {Component, OnInit} from '@angular/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {LoaderService} from '../../../service/loader.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  color = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: LoaderService) {
  }

  ngOnInit(): void {
  }


}
