import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {TooltipDirective} from './component/shared/tooltip.directive';

import {AppComponent} from './app.component';
import {MatModule} from './mat.module';
import {SchoolService} from './service/SchoolClass.service';
import {SchoolClassComponent} from './component/school-class/school-class.component';
import {SectionComponent} from './component/section/section.component';
import {StudentComponent} from './component/student/student.component';
import {LoaderComponent} from './component/shared/loader/loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {LoaderService} from './service/loader.service';
import {LoaderInterceptor} from './service/loader.interceptor';
import {ToasterContainerComponent} from './component/shared/toaster-container/toaster-container.component';
import {ToasterComponent} from './component/shared/toaster/toaster.component';

@NgModule({
  declarations: [
    AppComponent,
    TooltipDirective,
    SchoolClassComponent,
    SectionComponent,
    StudentComponent,
    LoaderComponent,
    ToasterContainerComponent,
    ToasterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatModule,
    StoreModule.forRoot({}, {}),
  ],
  providers: [
    SchoolService,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
