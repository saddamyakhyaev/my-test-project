
import {Component, OnInit, Inject } from "@angular/core";
import {NotificationsService, SessionService} from "bis-angular-core";
import { Message } from "primeng/primeng";
@Component({
    selector: 'audit-resource-app',
    templateUrl: './audit-resource-app.component.html'
})

export class AuditResourceAppComponent {
    msgs: Message[] = [];
    finYear: number;
    user: any;

    constructor (public notificationsService:NotificationsService
        ,public sessionService: SessionService
    ) {
        this.msgs = notificationsService.msgs;
    }

    ngOnInit() {
        this.sessionService
            .yearChangeEvent
            .subscribe(finYear => this.selectedYearEventHandler(finYear));

        this.sessionService
            .userChangeEvent
            .subscribe(user => this.selectedUserEventHandler(user));
    }

    selectedYearEventHandler(finYear:number) {
        this.finYear = finYear;
    }

    selectedUserEventHandler(user:any) {
        this.user = user;
    }
}