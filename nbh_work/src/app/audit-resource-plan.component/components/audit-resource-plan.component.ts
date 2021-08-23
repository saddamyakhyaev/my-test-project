import {Component, HostListener, OnInit, Inject, ViewChild, Input, ElementRef, EventEmitter} from "@angular/core";
import {Message, ConfirmationService} from "primeng/primeng";
import {SessionService} from "bis-angular-core";
import {MessageService} from 'primeng/components/common/messageservice';
import {ActivatedRoute, Router} from "@angular/router";
import {StepsModule, MenuItem} from 'primeng/primeng';
import {ViewEncapsulation} from "@angular/core";
import {Table} from "primeng/table";
import {CalendarService} from "../../calendar.service";
import {userControl} from "../../model/userControl";
import {AuditResourceService} from "../../audit-resource.service";
import { GanttEditorComponent, GanttEditorOptions } from 'ng-gantt';
import { Validators, FormBuilder } from "@angular/forms";
import {auditControl} from "../../model/auditControl";





@Component({
    selector: 'audit-resource-plan',
    templateUrl: './audit-resource-plan.component.html',
    encapsulation : ViewEncapsulation.None,

})

export class AuditResourcePlanComponent implements OnInit {

    busy: Promise<any>;
    dataUserResource: userControl[] = [];
    selectedRow: userControl = {} as userControl;
    ObProver: auditControl = {} as auditControl;
    items: MenuItem[];
    OneItems: MenuItem[];
    NewDialWind: boolean = false;
    NewAddWind: boolean = false;
    searchStr: string;
    lengthFilter: number = 0;
    public all: string = 'all';
    public groupIds: Set<string> = new Set();
    public groupOrgs: Set<string> = new Set();
    public filteredRows: Map<string, number> = new Map();
    private notSavedData: boolean = false;
    /** текущий год */
    private Year: number;
    /** текущий пользователь */
    user: any;
    /** диапазон дат */
    yearRange: string = "2000:2099";


    public data: any;

    public editorOptions: any = {};

    public data2: any;



    @ViewChild("editor") editor: GanttEditorComponent;



    @ViewChild('componentAuditResourcePlan') componentAuditResourcePlan: AuditResourcePlanComponent;
    @ViewChild('dt') dataTable: Table;

    constructor(@Inject("windowObject") private window: Window,
                private sessionService: SessionService,
                private messageService: MessageService,
                private elementRef: ElementRef,
                private confirmationService: ConfirmationService,
                private route: ActivatedRoute,
                private router: Router,
                private auditResService: AuditResourceService,
                private calendarService: CalendarService,
                public fb: FormBuilder,


               // private auditPrintService: AuditPrintServiceResource,
    ) {
        this.defineBindings();
        this.editorOptions = {
            vFormat: "day",
            vEditable: true,

        };
        this.data = [{
            'pID': 2,
            'pName': 'Create HTML Shell',
            'pStart': '2021-06-04',
            'pEnd': '2021-08-29',
            'pClass': 'gtaskyellow',
            'pLink': '',
            'pMile': 0,
            'pRes': 'Brian',
            'pComp': 20,
            'pGroup': 0,
            'pParent': 0,
            'pOpen': 1,
            'pDepend': 122,
            'pCaption': '',
            'pNotes': ''
            // 'pDepend': 0, // Зависимость

        },
            {
                'pID': 12,
                'pName': 'Task Objects',
                'pStart': '2021-06-01',
                'pEnd': '2021-08-20',
                'pClass': 'ggroupblack',
                'pLink': '',
                'pMile': 0,
                'pRes': 'Shlomy',
                'pComp': 40,
                'pGroup': 1,
                'pParent': 1,
                'pOpen': 1,
                'pDepend': '',
                'pCaption': '',
                'pNotes': ''
            },
            {
                'pID': 121,
                'pName': 'Constructor Proc #1234 of February 2017',
                'pStart': '2021-06-01',
                'pEnd': '2021-08-29',
                'pClass': 'gtaskblue',
                'pLink': '',
                'pMile': 0,
                'pRes': 'Brian T.',
                'pComp': 60,
                'pGroup': 0,
                'pParent': 12,
                'pOpen': 1,
                'pDepend': '',
                'pCaption': '',
                'pNotes': ''
            },
            {
                'pID': 122,
                'pName': 'Task Variables',
                'pStart': '2021-06-01',
                'pEnd': '2021-08-29',
                'pClass': 'gtaskred',
                'pLink': '',
                'pMile': 0,
                'pRes': 'Brian',
                'pComp': 60,
                'pGroup': 0,
                'pParent': 12,
                'pOpen': 1,
                'pDepend': 121,
                'pCaption': '',
                'pNotes': ''
            },];



    };




    changeData(i: userControl[]) {
        this.notSavedData = true;
    }

    private defineBindings() {
        this.successLoadData = this.successLoadData.bind(this);
        this.errorLoadData = this.errorLoadData.bind(this);
    }

    successLoadData(data: userControl[]) {
        this.dataUserResource = data;
        this.selectedRow = data[0];
        this.DateNormalize();

    }


    private DateNormalize() {
        for (let i = 0; i < this.dataUserResource.length; i++) {
            CalendarService.normalizeuserControlRes(this.dataUserResource[i]);
        }

    }


    ngOnInit() {
        this.busy = this.auditResService.getAllResUser()
            .then(this.successLoadData, this.errorLoadData);
        this.items = [
            {label: 'Редактировать', icon: 'fa-pencil', command: () => {this.NewDialWindow()}},
            {label: 'Удалить', icon: 'fa-close', command: () => {this.askDeleteRow(this.selectedRow)}}
        ];


        this.Year = this.sessionService.getCurrentYear();
        this.sessionService
            .yearChangeEvent
            .subscribe(finYear => this.selectedYearEventHandler(finYear));

        this.sessionService
            .userChangeEvent
            .subscribe(user => this.selectedUserEventHandler(user));

    }


    public ReloadData() {
        this.busy = this.auditResService.getAllResUser().then(this.successLoadData, this.errorLoadData);
        this.items = [
            {label: 'Редактировать', icon: 'fa-pencil', command: () => {this.NewDialWindow()}},
            {label: 'Удалить', icon: 'fa-close', command: () => {this.askDeleteRow(this.selectedRow)}}
        ];
    }

    private askDeleteRow(data: userControl) {
        this.confirmationService.confirm({
            message: 'Вы действительно хотите удалить данные?',
            header: 'Подтверждение операции',
            icon: 'fa fa-question-circle',
            accept: () => {
                this.busy = this.auditResService.deleteResource(data.id).then(data => {
                    if (data == true) {
                        this.messageService.add({severity: 'success', summary: 'Сообщение', detail: 'Данные удалены'});
                        this.ReloadData();
                    } else {
                        this.messageService.add({
                            severity: 'warning',
                            summary: 'Сообщение',
                            detail: 'Не удалось удалить'
                        });
                    }
                }).catch(error => {
                })
            },
            reject: () => {
            }
        });
    }

    public NewDialWindow(): void
    {
        this.data = [... this.data,
            { pID: Math.random() * 100,

                pName: "new item",
                'pStart': '',
                'pEnd': '',
                'pClass': 'gmilestone',
                'pLink': '',
                'pMile': 1,
                'pRes': 'null',
                'pComp': 0,
                'pGroup': 1,
                'pParent': 0,
                'pOpen': 1,
                'pDepend': 0,
            }];
    }





    // showAddRow(row) {
    //
    //     this.router.navigate(['/audit-add']);
    // }

    /**
     * Обработка события по смене текущего года
     * @param Year
     */
    selectedYearEventHandler (Year:number) {
        this.Year = Year;
        this.ReloadData();
    }

    /**
     * Обработка события по текущему пользователю
     * @param user
     */
    selectedUserEventHandler (user:any) {
        this.user = user;
    }

    private applyFilter($event: any){
        this.dataTable.filterGlobal(this.searchStr, 'contains');
        if ($event.filteredValue === undefined){
            this.lengthFilter = 0;
        }else{
            this.lengthFilter = $event.filteredValue.length;
        }

        const filtered: userControl[] = $event.filteredValue as userControl[];

        this.filteredRows = this.calculateRows(filtered);
        this.groupIds = this.extractGroupIds(filtered);
    }

    private calculateRows(data: userControl[]): Map<string, number> {
        const result: Map<string, number> = new Map();
        if (!data) return result;

        result.set(this.all, data.length);
        data.filter(i => i.imya).forEach(i => result.set(i.imya, (result.get(i.imya) || 0) + 1));
        return result;
    }

    private extractGroupIds(data: userControl[]): Set<string> {
        const result: Set <string> = new Set();
        if (!data) return result;
        {
            let imya: string;
            data.forEach(i => {
                if (imya !== i.name) {
                    result.add(i.id);
                    imya = i.name;
                }
            });
        }
        return result;
    }


    errorLoadData() {

    }
}
