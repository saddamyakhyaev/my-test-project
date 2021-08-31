import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatailDataService} from "./DatailDataService";
import {SearchService} from "./searchService";
import {NgGanttEditorModule} from "ng-gantt";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    NgGanttEditorModule

  ],
  providers: [{ provide: 'Window', useValue: window }, DatailDataService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
