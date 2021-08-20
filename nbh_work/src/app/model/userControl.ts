import {auditControl} from "./auditcontrol";

export interface userControl {
    id: string;
    code: string;
    name:string;
    post:string;
    imya:string;
    familiya:string;
    otchestvo:string;
    isDeleted: boolean;
    version: number;
    dateModify: Date;
    dateBegin: Date;
    dateEnd: Date;



    auditcontrol: auditControl;


}