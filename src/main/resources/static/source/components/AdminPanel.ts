import {Component, Inject} from 'angular2/core';
import {AdminPanelService} from "../services/AdminPanelService";
import {User} from "../models/User";
import {Response} from "../models/Response";

@Component({
    selector:'admin-panel',
    directives:[],
    templateUrl: 'dist/templates/admin-panel.html'
})
export class AdminPanel {

    private users: User[];
    private response: Response;

    constructor(@Inject(AdminPanelService) private adminPanelService: AdminPanelService) {
        //load users
        this.getUsersList();
    }

    public getUsersList() {

        this.adminPanelService
            .getUsersList()
            .subscribe(
                response => {

                    this.response = response.json();
                    this.users = this.response._embedded.users;
                },
                err      => console.log(err),
                ()       => console.log("Request complete")
            );
    }

    /**
     * Method for remove user
     *
     * @param userId
     */
    public removeUser(userId: number) {
        this.adminPanelService.removeUser(userId).subscribe(
            response => {
                console.log('User: ' + userId + 'was removed');
            },
            err      => console.log(err),
            ()       => this.getUsersList()
        );
    }
}
