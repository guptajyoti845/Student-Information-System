import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UnlessDirective} from './unless.directive';
import {SectionComponent} from './component/section/section.component';
import {StudentComponent} from './component/student/student.component';
import {CommonModule} from '@angular/common';
import {SlideDrawerComponent} from './slide-drawer/slide-drawer.component';
import {MatTreeModule} from '@angular/material/tree';
import {StoreModule} from '@ngrx/store';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {LoaderInterceptor} from './service/loader.interceptor';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TooltipDirective} from './shared/tooltip.directive';
import {MatSidenavModule} from '@angular/material/sidenav';

import {AppComponent} from './app.component';
import {SchoolService} from './service/SchoolClass.service';
import {ToasterContainerComponent} from './component/toaster-container/toaster-container.component';
import {SchoolClassComponent} from './component/school-class/school-class.component';
import {ToasterComponent} from './component/toaster/toaster.component';
import {ToasterService} from './service/toaster.service';
import { DrawerComponent } from './component/drawer/drawer.component';

@NgModule({
  declarations: [
    AppComponent,
    SchoolClassComponent,
    UnlessDirective,
    SectionComponent,
    StudentComponent,
    SlideDrawerComponent,
    TooltipDirective,
    ToasterContainerComponent,
    ToasterComponent,
    DrawerComponent
  ],
  imports: [
    MatSidenavModule,
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
    StoreModule.forRoot({}, {}),
    MatTooltipModule
  ],
  providers: [SchoolService,
    ToasterService,
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
