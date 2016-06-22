import {Injectable, Inject} from 'angular2/core';
import {User} from "../models/User";
import {HttpAuthService} from "./HttpAuthService";
import {Config} from '../config/Config';

@Injectable()
export class OAuthService {

    private host : string;

    private refreshToken: Object = null;

    private clientId : string;
    private storageItemName : string;
    private refreshInterval: number;

    private signInUrl : string;
    private signUpUrl : string;
    private refreshUrl : string;

    constructor(
        @Inject(HttpAuthService) private httpAuthService: HttpAuthService,
        @Inject(Config) private config: Config
    ) {

        if(this.refreshToken == null && localStorage.getItem(this.storageItemName)) {
            this.updateToken();
        }
        
        this.host = config.host;
        this.clientId = config.clientId;
        this.storageItemName = config.storageItemName;
        this.refreshInterval = config.timeoutTokenRefresh;

        this.signInUrl = config.signInUrl;
        this.signUpUrl = config.signUpUrl;
        this.refreshUrl = config.refreshUrl;
    }

    /**
     * Auth method
     */
    public authUser(user: User, cb: any): any {

        var authForm = {
            "grant_type": "password",
            "client_id": this.clientId,
            "username": user.username,
            "password": user.password
        };

        this.httpAuthService.post(
                this.host + this.signInUrl,
                authForm,
                'signin'
            )
            .subscribe(
                response => {
                    response = response.json();
                    response['expires_in'] = new Date().getTime() + response['expires_in'] - this.refreshInterval;
                    localStorage.setItem(this.storageItemName, JSON.stringify(response));
                    cb(true, {});
                },
                err  => cb(false, err),
                ()   => console.log("SignIn complete")
            )
    }


    /**
     * SignUp method
     *
     * @param user
     */
    public signUpUser(user: User): any {

        return this.httpAuthService
            .post(
                this.host + this.signUpUrl,
                user,
                'noauth'
            );
    }


    /**
     * Refresh access token by sheduller
     *
     */
    private updateToken() {

        var refreshForm = {
            "grant_type": "refresh_token",
            "client_id": this.clientId,
            "refresh_token": null
        };

        var me = this;

        this.refreshToken = setInterval(function () {

            let tokenObj = JSON.parse(localStorage.getItem(me.storageItemName));
            let currentTime = new Date().getTime();


            if(tokenObj != null && tokenObj['expires_in'] >= currentTime) {

                refreshForm.refresh_token = tokenObj['refresh_token'];

                me.httpAuthService.post(
                    me.host + me.refreshUrl,
                    refreshForm,
                    'refresh'
                )
                .subscribe(
                    response => {
                        response = response.json();
                        response['expires_in'] = new Date().getTime() + response['expires_in'] - this.refreshInterval;
                        localStorage.setItem(me.storageItemName, JSON.stringify(response));
                    },
                    err => console.log(err),
                    () => console.log("Refresh complete")
                )
            }

        }, this.refreshInterval);
    }
}
