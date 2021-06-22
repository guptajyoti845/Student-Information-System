import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';

import {AppComponent} from './app.component';
import {SchoolService} from './service/SchoolClass.service';
import {SchoolClassComponent} from './component/school-class-list/school-class.component';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {FormsModule} from '@angular/forms';
import { UnlessDirective } from './unless.directive';
import {TooltipDirective} from './shared/tooltip.directive';
import { SectionComponent } from './component/section-list/section.component';
import { StudentComponent } from './component/student/student.component';

@NgModule({
  declarations: [
    AppComponent,
    SchoolClassComponent,
    UnlessDirective,
    TooltipDirective,
    SectionComponent,
    StudentComponent
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
  providers: [SchoolService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
