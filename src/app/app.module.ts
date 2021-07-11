import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {TooltipDirective} from './component/shared/tooltip.directive';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import {ToasterContainerComponent} from './component/toaster-container/toaster-container.component';
import {ToasterComponent} from './component/toaster/toaster.component';
import {ToasterService} from './service/toaster.service';
import {MatModule} from './mat.module';
import {SchoolService} from './service/SchoolClass.service';
import {SchoolClassComponent} from './component/school-class/school-class.component';
import {SectionComponent} from './component/section/section.component';
import {StudentComponent} from './component/student/student.component';
import {LoaderComponent} from './component/shared/loader/loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {LoaderService} from './service/loader.service';
import {LoaderInterceptor} from './service/loader.interceptor';
import {reducers} from './state';

@NgModule({
  declarations: [
    AppComponent,
    TooltipDirective,
    ToasterContainerComponent,
    ToasterComponent,
    SchoolClassComponent,
    SectionComponent,
    StudentComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatProgressSpinnerModule,
    CommonModule,
    ReactiveFormsModule,
    MatModule,
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument(),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),],
  providers: [
    ToasterService,
    SchoolService,
    LoaderService,
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
