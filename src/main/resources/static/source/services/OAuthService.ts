import {Injectable, Inject} from 'angular2/core';
import {User} from "../models/User";
import {Http, Headers} from "angular2/http";
import {Router} from 'angular2/router'

@Injectable()
export class OAuthService {

    private host : string = "http://localhost:8083";

    private signInUrl : string = "/oauth/token";
    private signUpUrl : string = "/api/users/signup";
    private getUser : string = "/api/users/test";

    private basicSecret: string = btoa("oauth2-server-admin:23s$j2$23j&fs@12(4%^%fdg24gf");

    constructor(
        @Inject(Http) private http: Http,
        @Inject(Router) private router: Router
    ) {}

    /**
     * Auth method
     */
    public authUser(user: User) {

        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + this.basicSecret);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        this.http
            .post(
                this.host + this.signInUrl,
                "grant_type=password&client_id=oauth2-server-admin&username="
                + user.username
                + "&password="
                + user.password,
                {headers: headers}
            )
            .subscribe(
                response => this.saveAuthTokens(response.json()),
                err  => console.log(err),
                ()   => console.log("SignIn complete")
            )
    }

    /**
     * Methos response authHeaders
     *
     * @returns {Headers}
     */
    public getAuthHeaders() : Headers {

        var tokenObj = JSON.parse(localStorage.getItem('token'));
        console.log(tokenObj);

        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + tokenObj.access_token);
        return headers;
    }

    /**
     * SignUp method
     *
     * @param user
     */
    public signUpUser(user: User) {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=UTF-8');

        this.http
            .post(
                this.host + this.signUpUrl,
                JSON.stringify(user),
                {headers: headers}
            )
            .subscribe(
                response => this.redirectToAuth(),
                err  => console.log(err),
                ()   => console.log("SignUp complete")
            )
    }

    /**
     * Save token to localStorage
     *
     * @param data
     */
    private saveAuthTokens(data){

        localStorage.setItem('token', JSON.stringify(data));

        this.http.get(
            this.host + this.getUser,
            {headers: this.getAuthHeaders()}
        ).subscribe(
            response => console.log(response.json()),
            err  => console.log(err),
            ()   => console.log("SignIn complete!")
        );
    }

    /**
     * Redirect to auth page
     */
    private redirectToAuth() {
        console.log("Redirect to auth page!");
        this.router.navigate(['SignIn']);
    }
}
