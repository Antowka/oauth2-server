import {Injectable, Inject} from 'angular2/core';
import {User} from "../models/User";
import {Http, Headers} from "angular2/http";

@Injectable()
export class SignUpService {

    private signUpUrl = "http://localhost:8083/api/users/signup";

    constructor(@Inject(Http) private http: Http) {}

    public signUpUser(user: User) {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=UTF-8');

        this.http
            .post(
                this.signUpUrl,
                JSON.stringify(user),
                {headers: headers}
            )
            .subscribe(
                response => this.saveToken(response),
                err  => console.log(err),
                ()   => console.log("SignUp complete")
            )
    }

    private saveToken(data){
        console.log(data);
    }
}
