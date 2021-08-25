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

    this.lang = {format : 'Select', feb : 'Фев', week : 'Неделя', month : 'Месяц'};

    // this.editorOptions = {
    //   vCaptionType: 'Complete',
    //   vQuarterColWidth: 96,
    //   vFormat: "day",
    //   vEditable: false,
    //   vLang: this.lang,
    //   // OnChangee
    //
    //
    //   // EventsClickCell
    //   vEvents: {
    //     taskname: console.log,
    //     res: console.log,
    //     dur: console.log,
    //     comp: console.log,
    //     start: console.log,
    //     end: console.log,
    //     planstart: console.log,
    //     planend: console.log,
    //     cost: console.log,
    //     additional_category: console.log, // for additional fields
    //     beforeDraw: ()=>console.log('1111 before draw listener'),
    //    //afterDraw: ()=>this.replaceInputToTextare()
    //   },
    //
    //   vEventClickRow: console.log,
    //   vEventClickCollapse: console.log,
    //
    //
    //   vAdditionalHeaders: { // Add data columns to your table
    //     pTopic: {
    //       title: 'Тема проверки'
    //     }
    //   },
    //
    //   // vQuarterColWidth: 36,
    //   // vShowEndWeekDate: 0,
    //   //vFormatArr: ['День', 'Неделя', 'Месяц', 'Quarter'],
    // };



    this.editorOptions = {
      vCaptionType: 'Complete',  // Set to Show Caption : None,Caption,Resource,Duration,Complete,
      vQuarterColWidth: 36,
      vDateTaskDisplayFormat: 'day dd month yyyy', // Shown in tool tip box
      vDayMajorDateDisplayFormat: 'mon yyyy - Week ww', // Set format to display dates in the "Major" header of the "Day" view
      vWeekMinorDateDisplayFormat: 'dd mon', // Set format to display dates in the "Minor" header of the "Week" view
      vLang: 'en2',
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
        pID: 1,
        pName: "Зуев Юрий Викторович",
        pStart: "",
        pEnd: "",
        pClass: "ggroupblack",
        pLink: "",
        pMile: 0,
        pRes: "Brian",
        pComp: 0,
        pGroup: 1,
        pParent: 0,
        pOpen: 1,
        pDepend: "",
        pCaption: "",
        pNotes: "Some Notes text"
      },
      {
        pID: 18,
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
      },

      {
        pID: 45,
        pName: "OLD Федеральное государственное бюджетное учреждение науки Институт гуманитарных исследований и проблем малочисленных народов Севера Сибирского отделения Российской академии наук",
        pTopic : "Деятельность по использованию и распоряжению федеральным имуществом",
        pStart: "2017-02-20",
        pEnd: "2017-07-20",
        pClass: "gtaskblue",
        pLink: "",
        pMile: 0,
        pRes: "Brian T.",
        pComp: 60,
        pGroup: 0,
        pParent: 1,
        pOpen: 1,
        pDepend: "",
        pCaption: "",
        pNotes: ""
      },
      {
        pID: 12,
        pName: "Соломаха  Роман Геннадиевич",
        pStart: "",
        pEnd: "",
        pClass: "ggroupblack",
        pLink: "",
        pMile: 0,
        pRes: "Shlomy",
        pComp: 40,
        pGroup: 1,
        pParent: 0,
        pOpen: 1,
        pDepend: "",
        pCaption: "",
        pNotes: ""
      },
      {
        pID: 121,
        pName: "OLD Федеральное государственное бюджетное учреждение науки Институт гуманитарных исследований и проблем малочисленных народов Севера Сибирского отделения Российской академии наук",
        pTopic : "Деятельность по использованию и распоряжению федеральным имуществом",
        pStart: "2017-02-21",
        pEnd: "2017-03-09",
        pClass: "gtaskblue",
        pLink: "",
        pMile: 0,
        pRes: "Brian T.",
        pComp: 60,
        pGroup: 0,
        pParent: 12,
        pOpen: 1,
        pDepend: "",
        pCaption: "",
        pNotes: ""
      },
      {
        pID: 122,
        pName: "Федеральное государственное бюджетное образовательное учреждение высшего образования \"Сибирский государственный университет науки и технологий имени академика М.Ф.Решетнева\"",
        pTopic : "Антитеррористическая защищенность объектов (территорий)",
        pStart: "2017-03-06",
        pEnd: "2017-03-11",
        pClass: "gtaskred",
        pLink: "",
        pMile: 0,
        pRes: "Brian",
        pComp: 60,
        pGroup: 0,
        pParent: 12,
        pOpen: 1,
        pDepend: 121,
        pCaption: "",
        pNotes: ""
      },
      {
        pID: 124,
        pName: "OLD Федеральное государственное бюджетное учреждение науки Институт общей и экспериментальной биологии Сибирского отделения Российской академии наук",
        pTopic : "Финансово-бюджетная и финансово-хозяйственная деятельность",
        pStart: "2017-03-09",
        pEnd: "2017-03-29",
        pClass: "gtaskred",
        pLink: "",
        pMile: 0,
        pRes: "Anyone",
        pComp: 60,
        pGroup: 0,
        pParent: 12,
        pOpen: 1,
        pDepend: "123SS",
        pCaption: "This is a caption",
        pNotes: null
      },
      {
        pID: 3,
        pName: "Тихонов Аркадий Анатольевич",
        pStart: "",
        pEnd: "",
        pClass: "ggroupblack",
        pLink: "",
        pMile: 0,
        pRes: "Brian",
        pComp: 0,
        pGroup: 1,
        pParent: 0,
        pOpen: 1,
        pDepend: "",
        pCaption: "",
        pNotes: ""
      },
      {
        pID: 31,
        pName: "OLD Международный союз  Содружество общественных организаций ветеранов (пенсионеров) независимых государств",
        pTopic : "Научная деятельность",
        pStart: "2017-02-25",
        pEnd: "2017-03-17",
        pClass: "gtaskpurple",
        pLink: "",
        pMile: 0,
        pRes: "Brian",
        pComp: 30,
        pGroup: 0,
        pParent: 12,
        pOpen: 1,
        pDepend: "",
        pCaption: "",
        pNotes: ""
      },
      {
        pID: 32,
        pName: "OLD Общероссийская общественная организация  Союз  пенсионеров России",
        pTopic : "Качество и безопасность медицинской деятельности",
        pStart: "2017-03-15",
        pEnd: "2017-03-24",
        pClass: "gtaskgreen",
        pLink: "",
        pMile: 0,
        pRes: "Shlomy",
        pComp: 40,
        pGroup: 0,
        pParent: 3,
        pOpen: 1,
        pDepend: "",
        pCaption: "",
        pNotes: ""
      },
      {
        pID: 33,
        pName: "OLD Всероссийская общественная организация ветеранов  БОЕВОЕ БРАТСТВО  ",
        pTopic : "Деятельность по использованию и распоряжению федеральным имуществом",
        pStart: "",
        pEnd: "",
        pClass: "ggroupblack",
        pLink: "",
        pMile: 0,
        pRes: "Someone",
        pComp: 40,
        pGroup: 2,
        pParent: 3,
        pOpen: 1,
        pDepend: "",
        pCaption: "",
        pNotes: ""
      },
      {
        pID: 332,
        pName: "OLD Автономная некоммерческая организация \"Учебно – кинологический центр \"Собаки – помощники инвалидов\"",
        pTopic : "Деятельность по использованию и распоряжению федеральным имуществом",
        pStart: "2017-03-06",
        pEnd: "2017-03-09",
        pClass: "gtaskblue",
        pLink: "",
        pMile: 0,
        pRes: "Brian",
        pComp: 60,
        pGroup: 0,
        pParent: 33,
        pOpen: 1,
        pDepend: "",
        pCaption: "",
        pNotes: ""
      },
      {
        pID: 333,
        pName: "OLD Фонд поддержки гуманитарных и просветительских инициатив \"Соработничество\"",
        pStart: "2017-03-11",
        pEnd: "2017-03-20",
        pClass: "gtaskblue",
        pLink: "",
        pMile: 0,
        pRes: "Brian",
        pComp: 0,
        pGroup: 0,
        pParent: 33,
        pOpen: 1,
        pDepend: "332",
        pCaption: "",
        pNotes: ""
      },
      {
        pID: 34,
        pName: "Кульчихина Екатерина Владимировна",
        pStart: "",
        pEnd: "",
        pClass: "ggroupblack",
        pLink: "",
        pMile: 0,
        pRes: "Anybody",
        pComp: 60,
        pGroup: 1,
        pParent: 0,
        pOpen: 0,
        pDepend: "",
        pCaption: "",
        pNotes: ""
      },
      {
        pID: 341,
        pName: "Loop each Task",
        pTopic : "Деятельность по использованию и распоряжению федеральным имуществом",
        pStart: "2017-03-26",
        pEnd: "2017-04-11",
        pClass: "gtaskred",
        pLink: "",
        pMile: 0,
        pRes: "Brian",
        pComp: 60,
        pGroup: 0,
        pParent: 34,
        pOpen: 1,
        pDepend: "",
        pCaption: "",
        pNotes: ""
      },
      {
        pID: 342,
        pName: "Calculate Start/Stop",
        pStart: "2017-04-12",
        pEnd: "2017-05-18",
        pClass: "gtaskpink",
        pLink: "",
        pMile: 0,
        pRes: "Brian",
        pComp: 60,
        pGroup: 0,
        pParent: 34,
        pOpen: 1,
        pDepend: "",
        pCaption: "",
        pNotes: ""
      },
      {
        pID: 343,
        pName: "Draw Task Div",
        pStart: "2017-05-13",
        pEnd: "2017-05-17",
        pClass: "gtaskred",
        pLink: "",
        pMile: 0,
        pRes: "Brian",
        pComp: 60,
        pGroup: 0,
        pParent: 34,
        pOpen: 1,
        pDepend: "",
        pCaption: "",
        pNotes: ""
      },
      {
        pID: 344,
        pName: "Draw Completion Div",
        pStart: "2017-05-17",
        pEnd: "2017-06-04",
        pClass: "gtaskred",
        pLink: "",
        pMile: 0,
        pRes: "Brian",
        pComp: 60,
        pGroup: 0,
        pParent: 34,
        pOpen: 1,
        pDepend: "342,343",
        pCaption: "",
        pNotes: ""
      },
      {
        pID: 35,
        pName: "Make Updates",
        pStart: "2017-07-17",
        pEnd: "2017-09-04",
        pClass: "gtaskpurple",
        pLink: "",
        pMile: 0,
        pRes: "Brian",
        pComp: 30,
        pGroup: 0,
        pParent: 34,
        pOpen: 1,
        pDepend: "333",
        pCaption: "",
        pNotes: ""
      }
    ];
  }

  ngOnInit(): void {

  }
}
