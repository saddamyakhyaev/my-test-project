import {NgModule, LOCALE_ID} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {GrowlModule} from "primeng/primeng";
import { AuditResourceAppComponent } from './components/audit-resource-app.component';


import { BusyModule} from 'angular2-busy';
import {TableModule} from 'primeng/table';
import {MessageService} from 'primeng/components/common/messageservice';
import {SessionService} from  "bis-angular-core";
import {HttpInterceptor, CoreModule, NotificationsService} from "bis-angular-core";


import {Http, XHRBackend,  BaseRequestOptions,  RequestOptions} from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';
import {AuditResourcePlan} from "../audit-resource-plan.component/module";


const appRoutes: Routes = [

];


@NgModule({
    imports: [
        HttpModule,
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        BusyModule,
        CoreModule,
        GrowlModule,
        AuditResourcePlan,
        RouterModule.forRoot(appRoutes, { useHash: true })

    ],
    declarations: [
        AuditResourceAppComponent
    ],
    providers: [

        { provide: 'Window', useValue: window }, //замена $window для ангуляра 2
        { provide: LOCALE_ID, useValue: "ru-RU"},
        MessageService,
        NotificationsService,
        { provide: Http, useClass: HttpInterceptor, deps: [XHRBackend, RequestOptions, Router]}

    ],
    bootstrap: [AuditResourceAppComponent],

})
export class AppModule {  }
