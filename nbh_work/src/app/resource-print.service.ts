import { Injectable } from "@angular/core";
import 'rxjs/Rx' ;
import {ResourceHttpService} from "./http.service";



    @Injectable()
        export class ResourcePrintService {


        public static URL: string = "/api/audit-resource-plan";

        constructor(private httpService: ResourceHttpService) {}

        public getExportExcel(code: string, id: string, fileLink: HTMLAnchorElement) {
            return this.httpService.getExportExcel(ResourcePrintService.URL + '/export-excel-resource-plan', ['id', id, 'code', code]).map(([fileName, fileContent]) => {
                fileLink.download = fileName || `ResourcePlan.xlsx`;
                fileLink.href = fileContent;
            });
        }
    }

}