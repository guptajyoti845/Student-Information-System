import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';

import {AppComponent} from './app.component';
import {ClassService} from './service/SchoolClass.service';
import {SchoolClassListComponent} from './school-class-list/school-class-list.component';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {FormsModule} from '@angular/forms';
import { UnlessDirective } from './unless.directive';
import {TooltipDirective} from './shared/tooltip.directive';

@NgModule({
  declarations: [
    AppComponent,
    SchoolClassListComponent,
    UnlessDirective,
    TooltipDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatListModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    FormsModule
  ],
  providers: [ClassService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
