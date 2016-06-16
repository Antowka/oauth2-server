import {Injectable, Inject} from 'angular2/core';
import {User} from "../models/User";
import {HttpAuthService} from "./HttpAuthService";
import {Router} from 'angular2/router'
import {LocalStorage} from 'angular2-angular2-localStorage'

@Injectable()
export class OAuthService {

    private host : string = "http://localhost:8083";

    private refreshToken: Object = null;

    private clientId : string = "oauth2-server-admin";
    private starageItemName : string= "token";

    private signInUrl : string = "/oauth/token";
    private signUpUrl : string = "/api/users/signup";
    private refreshUrl : string = "/oauth/token";
    private getUser : string = "/api/users/test";



    constructor(
        @Inject(HttpAuthService) private httpAuthService: HttpAuthService,
        @Inject(Router) private router: Router,
        @Inject(LocalStorage) private ls:LocalStorage
    ) {

        if(this.refreshToken == null && localStorage.getItem(this.starageItemName)) {
            this.updateToken();
        }
    }

    /**
     * Auth method
     */
    public authUser(user: User) {

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
                    console.log(response); //TODO : Установка временной метки
                    response['expires_in'] = new Date().getTime() + response['expires_in'];
                    localStorage.setItem(this.starageItemName, JSON.stringify(response));
                    console.log(localStorage);
                },
                err  => console.log(err),
                ()   => console.log("SignIn complete")
            )
    }


    /**
     * SignUp method
     *
     * @param user
     */
    public signUpUser(user: User) {

        this.httpAuthService
            .post(
                this.host + this.signUpUrl,
                user,
                'noauth'
            )
            .subscribe(
                response => this.redirectToAuth(),
                err  => console.log(err),
                ()   => console.log("SignUp complete")
            )
    }


    /**
     * Redirect to auth page
     */
    private redirectToAuth() {
        console.log("Redirect to auth page!");
        this.router.navigate(['SignIn']);
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

        this.refreshToken = setInterval(function () {

            let tokenObj = JSON.parse(localStorage.getItem(this.starageItemName));
            let currentTime = new Date().getTime();

            console.log("UPDATE TOKEN! ");
            console.log(localStorage.getItem(this.starageItemName));

            if(tokenObj != null && tokenObj['expires_in'] >= currentTime) {

                refreshForm.refresh_token = tokenObj['refresh_token'];

                this.httpAuthService.post(
                    this.host + this.refreshUrl,
                    refreshForm,
                    'refresh'
                )
                .subscribe(
                    response => {
                        response = response.json();
                        response['expires_in'] = new Date().getTime() + response['expires_in'];
                        localStorage.setItem(this.starageItemName, JSON.stringify(response));
                    },
                    err => console.log(err),
                    () => console.log("Refresh complete")
                )
            }

        }, 10e3);
    }
}
