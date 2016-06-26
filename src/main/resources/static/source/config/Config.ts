import {Injectable} from "angular2/core";

@Injectable()
export class Config {

    constructor(){}

    //langs
    private _defaultLang: string = 'en';
    private _langs: any = ['en', 'ru'];

    //URLs
    private _host: string = 'http://localhost:8083';
    private _signInUrl : string = "/oauth/token";
    private _signUpUrl : string = "/api/users/signup";
    private _refreshUrl : string = "/oauth/token";

    //tokens
    private _timeoutTokenRefresh: number = 10e3;
    private _clientId: string = 'oauth2-server-admin';
    private _secret: string = '23s$j2$23j&fs@12(4%^%fdg24gf';
    private _storageItemName: string = 'token';

    //api
    private _urlGetListUsers: string = '/api/users?projection=exp_user'; // link fot get list users
    private _usersUrl: string = '/api/users';




    get defaultLang():string {
        return this._defaultLang;
    }

    get langs():any {
        return this._langs;
    }

    get host():string {
        return this._host;
    }

    get signInUrl():string {
        return this._signInUrl;
    }

    get signUpUrl():string {
        return this._signUpUrl;
    }

    get refreshUrl():string {
        return this._refreshUrl;
    }

    get timeoutTokenRefresh():number {
        return this._timeoutTokenRefresh;
    }

    get clientId():string {
        return this._clientId;
    }

    get secret():string {
        return this._secret;
    }

    get storageItemName():string {
        return this._storageItemName;
    }

    get urlGetListUsers():string {
        return this._urlGetListUsers;
    }
    
    get usersUrl():string {
        return this._usersUrl;
    }
}
