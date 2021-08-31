import {Component, Inject, OnInit, ViewChild} from '@angular/core';

import {JQueryStyleEventEmitter} from "rxjs/internal/observable/fromEvent";
import {DOCUMENT} from "@angular/common";
import {GanttEditorOptions} from "ng-gantt";
import {GanttEditorComponent} from "ng-gantt";
import {DatailDataService} from "./DatailDataService";
import {delay} from "rxjs/operators";
import {SearchService} from "./searchService";

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public editorOptions: GanttEditorOptions;
  public data: any;
  public dataAll: any[];
  public lang: any;
  public hidePopup: boolean = true


  @ViewChild('editor', { static: true }) editor: GanttEditorComponent;

  //@ViewChild("editor") editor: GanttEditorComponent;

  constructor(@Inject(DOCUMENT) private document: Document,
              private datailDataService: DatailDataService,
              private searchService: SearchService) {
    // this.editorOptions = new GanttEditorOptions()


    this.editorOptions = {
      vCaptionType: 'Complete',  // Set to Show Caption : None,Caption,Resource,Duration,Complete,
      vQuarterColWidth: 70,
      vLang: 'ru',
      vScrollTo: "2020-02-02",
      vUseSingleCell: 40000,
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
        cost: console.log,
        afterDraw: ()=> {

        }
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



    this.dataAll = this.initialData();
    this.data =this.dataAll;
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



  search(event: any){

    this.searchService.inputWithDelay(()=>{
      console.log("SEARRRCGH");
      console.log(event.target.value);
      this.data = this.datailDataService.search(this.dataAll, event.target.value);
      this.editor.setOptions(this.editorOptions);
    }, 1000);
  }



  initialData(): any[] {
    return [


        {
          "pID": 2,
          "pName": "Зуев Юрий Викторович",
          "pClass": "ggroupblack",
          "pStart": "",
          "pEnd": "",
          "pPlanStart": "",
          "pPlanEnd": "",
          "pMile": 0,
          "pParent": 0,
          "pComp": 0,
          "pGroup": 1,
          "pOpen": 0,
          "pDepend": 0
        },
        // {
        //   "pID": 3,
        //   "pName": "<span class=\"ggnotaskspan\">Нет задач на указанный год</span>",
        //   "pStart": "2021-10-10T10:10:10",
        //   "pEnd": "2021-11-25T10:10:10",
        //   "pClass": "ggnotask",
        //   "pMile": 0,
        //   "pParent": 2,
        //   "pComp": 0,
        //   "pGroup": 0,
        //   "pOpen": 0,
        //   "pDepend": 0
        // },
        {
          "pID": 5,
          "pName": "Учреждение",
          "pStart": "2018-03-15T00:00:00",
          "pEnd": "2018-03-31T00:00:00",
          "pPlanStart": "2018-03-15T00:00:00",
          "pPlanEnd": "2018-03-31T00:00:00",
          "pClass": "gtaskpink",
          "pMile": 0,
          "pParent": 3,
          "pComp": 1,
          "pGroup": 0,
          "pOpen": 1,
          "pDepend": 0,
          "topicID": 8
        },
        // {
        //   "pID": 4,
        //   "pName": "Соломаха  Роман Геннадиевич",
        //   "pClass": "ggroupblack",
        //   "pStart": "",
        //   "pEnd": "",
        //   "pPlanStart": "",
        //   "pPlanEnd": "",
        //   "pMile": 0,
        //   "pParent": 0,
        //   "pComp": 0,
        //   "pGroup": 1,
        //   "pOpen": 1,
        //   "pDepend": 0
        // },
        // {
        //   "pID": 6,
        //   "pName": "Зуев Юрий Викторович",
        //   "pClass": "ggroupblack",
        //   "pStart": "",
        //   "pEnd": "",
        //   "pPlanStart": "",
        //   "pPlanEnd": "",
        //   "pMile": 0,
        //   "pParent": 0,
        //   "pComp": 0,
        //   "pGroup": 1,
        //   "pOpen": 0,
        //   "pDepend": 0
        // }



    ];
  }

  ngOnInit(): void {

  }
}
