import {Injectable, Inject} from 'angular2/core';
import {User} from "../models/User";
import {HttpAuthService} from "./HttpAuthService";
import {Router} from 'angular2/router'

@Injectable()
export class OAuthService {

    private host : string = "http://localhost:8083";

    private signInUrl : string = "/oauth/token";
    private signUpUrl : string = "/api/users/signup";
    private getUser : string = "/api/users/test";



    constructor(
        @Inject(HttpAuthService) private httpAuthService: HttpAuthService,
        @Inject(Router) private router: Router
    ) {}

    /**
     * Auth method
     */
    public authUser(user: User) {

        var authForm = {
            "grant_type":"password",
            "client_id":"oauth2-server-admin",
            "username": user.username,
            "password": user.password
        };

        this.httpAuthService.post(
                this.host + this.signInUrl,
                authForm
            )
            .subscribe(
                response => {
                    response = response.json();
                    console.log(response); //TODO : Установка временной метки
                    response['expires_in'] = new Date().getTime() + response['expires_in'];
                    localStorage.setItem('token', JSON.stringify(response));
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
                user
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
}
