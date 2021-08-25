import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgGanttEditorModule} from "ng-gantt/src/lib.module";


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
  providers: [{ provide: 'Window', useValue: window }],
  bootstrap: [AppComponent]
})
export class AppModule { }
