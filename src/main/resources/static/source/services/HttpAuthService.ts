import {Injectable, Inject} from 'angular2/core';
import {Http, Headers, Response} from "angular2/http";
import {Observable} from "rxjs/Rx";

@Injectable()
export class HttpAuthService {

    private basicSecret: string = btoa("oauth2-server-admin:23s$j2$23j&fs@12(4%^%fdg24gf");
    
    constructor(@Inject(Http) private http: Http) {}

    /**
     * Method for GET request
     * 
     * @param url
     * @returns {Observable<Response>}
     */
    public get(url: string): Observable<Response> {
        return this.http.get(url, {
            headers:this.getAuthHeaders()
        });
    }

    /**
     * 
     * @param url
     * @param data
     * @returns {Observable<Response>}
     */
    public post(url: string, data: any): Observable<Response> {

        let headers = this.getAuthHeaders();
        headers.append('Content-Type', 'application/json;charset=UTF-8');

        return this.http.post(
            url,
            JSON.stringify(data),
            {headers:headers}
        );
    }

    /**
     * Methos response authHeaders
     *
     * @returns {Headers}
     */
    private getAuthHeaders() : Headers {

        var tokenObj = JSON.parse(localStorage.getItem('token'));
        let headers = new Headers();

        if(tokenObj) {
            console.log(tokenObj);
            headers.append('Authorization', 'Bearer ' + tokenObj.access_token);
        } else {
            headers.append('Authorization', 'Basic ' + this.basicSecret);
        }

        return headers;
    }

    /**
     * Save token to localStorage
     *
     * @param data
     */
    private saveAuthTokens(data){

        localStorage.setItem('token', JSON.stringify(data));
    }
}
