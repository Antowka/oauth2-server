import {Injectable, Inject} from "angular2/core";
import {HttpAuthService} from "./HttpAuthService";
import {User} from "../models/User";
import {Config} from "../config/Config";
import {Response} from "angular2/http";
import {Observable} from "rxjs/Rx";

@Injectable()
export class AdminPanelService {

    private urlGetListUsers: string;
    private userUrl: string;
    private host: string;
    
    constructor(
        @Inject(HttpAuthService) private httpAuthService: HttpAuthService,
        @Inject(Config) private config: Config
    ) {
        this.host = config.host;
        this.userUrl = config.usersUrl;
        this.urlGetListUsers = config.urlGetListUsers;
    }

    /**
     * Method response list registrated users
     * 
     * @returns subscribe
     */
    public getUsersList():  Observable<Response> {
        return this.httpAuthService.get(this.host + this.urlGetListUsers, 'auth');
    }

    /**
     * Method for remove user
     *
     * @param userId
     */
    public removeUser(userId: number):  Observable<Response> {

        let removeUrl = this.host + this.userUrl + '/' + userId;

        return this.httpAuthService.remove(removeUrl, 'auth');
    }
}