import { Injectable, Inject } from "@angular/core";
import "rxjs/add/operator/toPromise";
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import {Observable} from "rxjs/Rx";
import {userControl} from "./model/userControl";


@Injectable()
export class AuditResourceService {
    private static URL: string = "/api/audit-resource-plan";
    private static HTML_BODY = /<body>(.*)<\/body>/i;

    //
    constructor(private http: Http, @Inject('Window') private window: Window) {
        if ((window as any).configContextPath) {
            AuditResourceService.URL = (window as any).configContextPath + AuditResourceService.URL;
        }
    }

    private static responseToError(response: Response): Error {
        debugger;
        return response.text().startsWith("<!DOCTYPE html>")
            ? new Error(response.text().match(AuditResourceService.HTML_BODY)[1])
            : <Error>response.json();
    }

    private static createCsrfHeader(): Headers {
        let headers = new Headers();
        let element: Element = document.querySelector('meta[name="_csrf"]');
        let token: string = element && element.getAttribute("content");
        if (!token) return headers;

        element = document.querySelector('meta[name="_csrf_header"]');
        let header: string = element && element.getAttribute("content");
        if (!header) return headers;

        headers.append(header, token);
        return headers;
    }

    public SaveResWindow(row: userControl): Promise<userControl> {
        return this.post<userControl>(`${AuditResourceService.URL}/audit-resource-plan/add/`, row)
            .toPromise()
            .catch((r: Response) => Promise.reject(AuditResourceService.responseToError(r)));
    }

    public post<T>(partUrl: string, item: any, extract?: (r: Response) => T): Observable<T> {
        const headers: Headers = AuditResourceService.createCsrfHeader();
        headers.append('Content-Type', 'application/json');

        return this.http.post(/*`${AuditResourceService.URL}` +*/ partUrl, item)
            .catch((e, c) => Observable.throw(AuditResourceService.responseToError(e)))
            .map((r: Response) => {
                return extract ? extract(r) : r.json() as T;
            }).map(r => {
                debugger;
                return r;
            })
    }

    public getAllResUser(): Promise<userControl[]> {

        return this.http.get(`${AuditResourceService.URL}/audit-resource-plan/all/`)
            .toPromise()
            .then((r: Response) => r.json() as userControl[])
            .catch((r: Response) => Promise.reject(AuditResourceService.responseToError(r)));
    }

    public deleteResource(id: string): Promise<boolean> {
        return this.http.get(`${AuditResourceService.URL}/audit-resource-plan/del/${id}`)
            .toPromise()
            .then((r: Response) => r.json() as boolean)
            .catch((r: Response) => Promise.reject(AuditResourceService.responseToError(r)));
    }
}