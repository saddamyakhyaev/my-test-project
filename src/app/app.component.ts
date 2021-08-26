import {Component, Inject, OnInit, ViewChild} from '@angular/core';

import {JQueryStyleEventEmitter} from "rxjs/internal/observable/fromEvent";
import {DOCUMENT} from "@angular/common";
import {GanttEditorOptions} from "ng-gantt/src/gantt/gantt.editoroptions";
import {GanttEditorComponent} from "ng-gantt/src/gantt/gantt.component";

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public editorOptions: GanttEditorOptions;
  public data: any;
  public lang: any;


  @ViewChild('editor', { static: true }) editor: GanttEditorComponent;

  //@ViewChild("editor") editor: GanttEditorComponent;

  constructor(@Inject(DOCUMENT) private document: Document) {
    // this.editorOptions = new GanttEditorOptions()
    this.data = this.initialData();


    this.editorOptions = {
      vCaptionType: 'Complete',  // Set to Show Caption : None,Caption,Resource,Duration,Complete,
      vQuarterColWidth: 36,
      vDateTaskDisplayFormat: 'day dd month yyyy', // Shown in tool tip box
      vDayMajorDateDisplayFormat: 'mon yyyy - Week ww', // Set format to display dates in the "Major" header of the "Day" view
      vWeekMinorDateDisplayFormat: 'dd mon', // Set format to display dates in the "Minor" header of the "Week" view
      vLang: 'ru',
      vAdditionalHeaders: { // Add data columns to your table
          pTopic: {
            title: 'Тема проверки'
          }
        },
      vEvents: {
        taskname: console.log,
        res: console.log,
        dur: console.log,
        comp: console.log,
        start: console.log,
        end: console.log,
        planstart: console.log,
        planend: console.log,
        cost: console.log
      },
      vEventsChange: {
      },
      vResources: [
        { id: 0, name: 'Anybody' },
        { id: 1, name: 'Mario' },
        { id: 2, name: 'Henrique' },
        { id: 3, name: 'Pedro' }
      ],
      vEventClickRow: console.log,
      vFormatArr: ['Day', 'Week', 'Month', 'Quarter'],
      vFormat: 'day'
    };

   // this.editor.setOptions(this.editorOptions);

     //setTimeout(this.replaceInputToTextare, 7000);
  }

  replaceInputToTextare() {
    var i: any;
    var arr: HTMLCollectionOf<Element> = document.getElementsByClassName('gantt-inputtable');
   // var arr: HTMLCollectionOf<Element> = document.getE('gantt-inputtable');

    for(i in arr){
      var element_input = arr[i];
      if(element_input instanceof Element) {
        console.log(element_input.getAttribute('value'));
        const element_textarea = document.createElement('textarea');
        element_textarea.className = 'gantt-inputtable';
        element_textarea.setRangeText(element_input.getAttribute('value') + "");
        element_input.replaceWith(element_textarea);
      }
    };



  }

  changeData() {
    this.data = [... this.data,
      {
        pID: 765,
        pName: "OLD Федеральное государственное бюджетное учреждение науки Институт теплофизики им. С.С. Кутателадзе Сибирского отделения Российской академии наук",
        pTopic : "Проверка деятельности",
        pStart: "2017-02-20",
        pEnd: "2017-07-20",
        pClass: "gtaskblue",
        pLink: "",
        pMile: 0,
        pRes: "Brian T.",
        pComp: 22,
        pGroup: 0,
        pParent: 1,
        pOpen: 1,
        pDepend: "",
        pCaption: "",
        pNotes: ""
      }];

    this.editor.setOptions(this.editorOptions);
  }



  initialData() {
    return [

      {
        "pID": 20,
        "pName": "Корчажкин  Андрей Павлович",
        "pClass": "ggroupblack",
        "pMile": 0,
        "pParent": 0,
        "pComp": 0,
        "pGroup": 1,
        "pOpen": 1,
        "pDepend": 0,
        "pCost" : 5
      },
      {
        "pID": 3,
        "pName": "Соломаха  Роман Геннадиевич",
        "pClass": "ggroupblack",
        "pCaption" : "HEEEEE",
        "pMile": 0,
        "pParent": 0,
        "pComp": 0,
        "pGroup": 1,
        "pOpen": 0,
        "pDepend": 0,
        "pCost" : 1
      },
      {
        "pID": 65,
        "pName": "Задачи нет",
        "pStart": "2018-12-20",
        "pEnd": "2018-12-30",
        "pClass": "gtaskblue_gru",
        "pMile": 0,
        "pParent": 3,
        "pComp": 0,
        "pGroup": 0,
        "pOpen": 1,
        "pDepend": 0,
        "topicID": 1
    },

      {
        "pID": 9,
        "pName": "Подведомственное учреждение 6",
        "pStart": "2018-02-07T00:00:00",
        "pEnd": "2018-02-27T00:00:00",
        "pTopic" : "pТопик блин",
        "pClass": "gtaskblue",
        "pMile": 0,
        "pParent": 8,
        "pComp": 47,
        "pGroup": 0,
        "pOpen": 1,
        "pDepend": 0,
        "topicID": 1,
      },

      {
        "pID": 21,
        "pName": "Подведомственное учреждение 6",
        "pStart": "2018-02-07T00:00:00",
        "pEnd": "2018-02-27T00:00:00",
        "pClass": "gtaskblue",
        "pTopic" : "pТопик блин",
        "pMile": 0,
        "pParent": 20,
        "pComp": 47,
        "pGroup": 0,
        "pOpen": 1,
        "pDepend": 0,
        "topicID": 1
      }

    ];
  }

  ngOnInit(): void {

  }
}
