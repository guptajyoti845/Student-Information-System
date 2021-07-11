import {NgModule} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
exports:[
  MatSidenavModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatTreeModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
]
})
export class MatModule {
}
