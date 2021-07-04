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
import {SchoolService} from './service/SchoolClass.service';
import {ToasterContainerComponent} from './component/toaster-container/toaster-container.component';
import {SchoolClassComponent} from './component/school-class/school-class.component';
import {ToasterComponent} from './component/toaster/toaster.component';
import {ToasterService} from './service/toaster.service';
import {DrawerComponent} from './component/drawer/drawer.component';
import {LoaderService} from './service/loader.service';
import {LoadMoreDatabase} from './service/loadMoreDatabase.service';
import {MatModule} from './mat.module';

@NgModule({
  declarations: [
    AppComponent,
    SchoolClassComponent,
    TooltipDirective,
    ToasterContainerComponent,
    ToasterComponent,
    DrawerComponent
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
  providers: [SchoolService,
    ToasterService,
    LoaderService,
    LoadMoreDatabase,
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
