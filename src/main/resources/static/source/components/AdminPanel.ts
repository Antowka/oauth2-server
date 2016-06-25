import {Component, Inject} from 'angular2/core';
import {AdminPanelService} from "../services/AdminPanelService";
import {User} from "../models/User";

@Component({
    selector:'admin-panel',
    directives:[],
    templateUrl: 'dist/templates/admin-panel.html'
})
export class AdminPanel {

    private users: User[];
    
    constructor(@Inject(AdminPanelService) private adminPanelService: AdminPanelService) {

        //load users
        this.getUsersList();
    }

    public getUsersList() {

        this.adminPanelService
            .getUsersList()
            .subscribe(
                response => {
                    this.users = response.json()._embedded.users;
                },
                err      => console.log(err),
                ()       => console.log("Request complete")
            );
    }
}
