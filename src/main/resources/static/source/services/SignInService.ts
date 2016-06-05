import {Injectable, Inject} from 'angular2/core';
import {User} from "../models/User";
import {Http, Headers} from "angular2/http";

@Injectable()
export class SignInService {

    private signInUrl : string = "/oauth/token";
    private basicSecret: string = btoa("oauth2-server-admin:23s$j2$23j&fs@12(4%^%fdg24gf");

    constructor(@Inject(Http) private http: Http) {}

    /**
     * Auth method
     */
    public authUser(user: User) {

        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + this.basicSecret);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        this.http
            .post(
                this.signInUrl,
                "grant_type=password&client_id=oauth2-server-admin&username="
                + user.username
                + "&password="
                + user.password,
                {headers: headers}
            )
            .subscribe(
                response => this.saveToken(response),
                err  => console.log(err),
                ()   => console.log("SignIn complete")
            )
    }

    private saveToken(data){
        console.log(data);
    }
}
