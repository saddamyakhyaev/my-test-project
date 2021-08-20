import {AuditResourcePlanComponent} from "./components/audit-resource-plan.component";
import {NgModule, LOCALE_ID} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule} from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule, BlockUIModule, ButtonModule, CalendarModule, CheckboxModule, ConfirmationService,
    ConfirmDialogModule, DataTableModule, DialogModule, DropdownModule, GrowlModule,
    InputTextareaModule, InputTextModule, PanelModule, SelectButtonModule, SharedModule,
    SplitButtonModule, ToolbarModule, TabViewModule, TooltipModule, TreeTableModule, MenubarModule, ContextMenuModule, ContextMenu, MenuItem, MenuModule, SlideMenuModule
} from 'primeng/primeng';
import { BusyModule} from 'angular2-busy';
import {TableModule} from 'primeng/table';
import {InputMaskModule} from 'primeng/inputmask';
import {MessageService} from 'primeng/components/common/messageservice';
import {SessionService} from  "bis-angular-core";
import {HttpInterceptor, CoreModule, NotificationsService} from "bis-angular-core";



import {Http, XHRBackend,  BaseRequestOptions,  RequestOptions} from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {CurrencyMaskModule} from "ng2-currency-mask";
import {CalendarService} from "../calendar.service";
import {AuditResourceService} from "../audit-resource.service";
import { NgGanttEditorModule } from 'ng-gantt'


const routes: Routes = [
    // { path: '', redirectTo: 'audit-org-list', pathMatch: 'full' },
    { path: 'audit-resource-plan',component:AuditResourcePlanComponent},

];

@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        CurrencyMaskModule,
        HttpModule,
        HttpClientModule,
        ReactiveFormsModule,
        BusyModule,
        AccordionModule,
        BlockUIModule,
        ButtonModule,
        CalendarModule,
        CheckboxModule,
        ConfirmDialogModule,
        DataTableModule,
        DialogModule,
        DropdownModule,
        GrowlModule,
        InputTextareaModule,
        InputTextModule,
        PanelModule,
        InputMaskModule,
        SelectButtonModule,
        SharedModule,
        SplitButtonModule,
        ToolbarModule,
        TooltipModule,
        CoreModule,
        TableModule,
        TreeTableModule,
        ContextMenuModule,
        MenuModule,
        SlideMenuModule,
        MenubarModule,
        TabViewModule,
        NgGanttEditorModule,
        RouterModule.forChild(routes),



    ],

    providers: [

        { provide: 'Window', useValue: window },
        { provide: LOCALE_ID, useValue: "ru-RU"},
        NotificationsService,
        MessageService,
        ConfirmationService,
        SessionService,
        CalendarService,
        AuditResourceService,



        // { provide: Http, useClass: HttpInterceptor, deps: [XHRBackend, RequestOptions, Router]}

    ],

    declarations: [
        AuditResourcePlanComponent,
    ],


    exports: [
        AuditResourcePlanComponent,
        RouterModule,
    ]
})

export class AuditResourcePlan { }