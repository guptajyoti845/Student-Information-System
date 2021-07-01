import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {SchoolService} from './service/SchoolClass.service';
import {SchoolClassComponent} from './component/school-class/school-class.component';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UnlessDirective} from './unless.directive';
import {TooltipDirective} from './shared/tooltip.directive';
import {SectionComponent} from './component/section/section.component';
import {StudentComponent} from './component/student/student.component';
import {CommonModule} from '@angular/common';
import {SlideDrawerComponent} from './component/slide-drawer/slide-drawer.component';
import {MatTreeModule} from '@angular/material/tree';
import {StoreModule} from '@ngrx/store';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {LoaderInterceptor} from './service/loader.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SchoolClassComponent,
    UnlessDirective,
    TooltipDirective,
    SectionComponent,
    StudentComponent,
    SlideDrawerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatTreeModule,
    MatIconModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot({}, {})
  ],
  providers: [SchoolService,

    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
