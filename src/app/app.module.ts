import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {LoaderInterceptor} from './service/loader.interceptor';
import {TooltipDirective} from './shared/tooltip.directive';

import {AppComponent} from './app.component';
import {APIService} from './service/api.service';
import {ToasterContainerComponent} from './component/toaster-container/toaster-container.component';
import {ToasterComponent} from './component/toaster/toaster.component';
import {ToasterService} from './service/toaster.service';
import {LoaderService} from './service/loader.service';
import {MatModule} from './mat.module';
import {SchoolService} from './service/SchoolClass.service';
import {SchoolClassComponent} from './component/school-class/school-class.component';
import {SectionComponent} from './component/section/section.component';
import {StudentComponent} from './component/student/student.component';

@NgModule({
  declarations: [
    AppComponent,
    TooltipDirective,
    ToasterContainerComponent,
    ToasterComponent,
    SchoolClassComponent,
    SectionComponent,
    StudentComponent
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
  providers: [APIService,
    ToasterService,
    LoaderService,
    SchoolService,
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
