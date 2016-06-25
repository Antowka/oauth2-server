import {Injectable, Inject} from 'angular2/core';
import {Http, Headers, Response} from "angular2/http";
import {Config} from '../config/Config';
import {Observable} from "rxjs/Rx";

@Injectable()
export class HttpAuthService {

    private basicSecret: string;
    private storageItemName: string;
    
    constructor(
        @Inject(Http) private http: Http,
        @Inject(Config) private config: Config) {

        this.basicSecret = btoa(config.clientId + ":" + config.secret);
        this.storageItemName = config.storageItemName;
    }

    /**
     * Method for GET request
     * 
     * @param url
     * @param type
     *
     * @returns {Observable<Response>}
     */
    public get(url: string, type:string): Observable<Response> {
        return this.http.get(url, {
            headers:this.getAuthHeaders(type)
        });
    }

    /**
     * 
     * @param url
     * @param data
     * @param type
     * @returns {Observable<Response>}
     */
    public post(url: string, data: any, type: string): Observable<Response> {

        let headers = this.getAuthHeaders(type);

        //For auth and refresh token
        if(type == 'signin' || type == 'refresh') {
            data = HttpAuthService.encodeJsonToUrl(data);
        } else {
            data = JSON.stringify(data);
        }

        return this.http.post(
            url,
            data,
            {headers:headers}
        );
    }

    /**
     * Methos response authHeaders
     *
     * @returns {Headers}
     */
    private getAuthHeaders(type:string) : Headers {

        var tokenObj = JSON.parse(localStorage.getItem(this.storageItemName));
        let headers = new Headers();

        switch(type){

            case 'signin':
                headers.append('Authorization', 'Basic ' + this.basicSecret);
                headers.append('Content-Type', 'application/x-www-form-urlencoded');
            break;

            case 'refresh':
                headers.append('Authorization', 'Basic ' + this.basicSecret);
                headers.append('Content-Type', 'application/x-www-form-urlencoded');
            break;

            case 'auth':
                if(tokenObj != null) {
                    headers.append('Authorization', 'Bearer ' + tokenObj.access_token);
                    headers.append('Content-Type', 'application/json;charset=UTF-8');
                }
            break;

            case 'noauth':
                headers.append('Content-Type', 'application/json;charset=UTF-8');
            break;
        }

        return headers;
    }

    /**
     * convert json to URL
     *
     * @param obj
     * @returns {string}
     */
    private static encodeJsonToUrl(obj: Object){
        let url:string = "";
        for (let key in obj) {
            url += (url.length == 0)?key + "=" + obj[key]:"&" + key + "=" + obj[key];
        }
        return url;
    }
}
