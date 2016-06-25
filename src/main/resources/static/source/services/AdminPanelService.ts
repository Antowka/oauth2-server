import {Injectable, Inject} from "angular2/core";
import {HttpAuthService} from "./HttpAuthService";
import {User} from "../models/User";
import {Config} from "../config/Config";

@Injectable()
export class AdminPanelService {

    private urlGetListUsers: string;
    private host: string;
    
    constructor(
        @Inject(HttpAuthService) private httpAuthService: HttpAuthService,
        @Inject(Config) private config: Config
    ) {
        this.host = config.host;
        this.urlGetListUsers = config.urlGetListUsers;
    }

    /**
     * Method response list registrated users
     * 
     * @returns subscribe
     */
    public getUsersList(): any {
        return this.httpAuthService.get(this.host + this.urlGetListUsers, 'auth');
    }
}