import {Component, Inject} from 'angular2/core';
import {OAuthService} from '../../services/OAuthService';
import {User} from '../../models/User';
import {ControlGroup, FormBuilder, Validators} from "angular2/common";


@Component({
    selector:'signin',
    directives:[],
    templateUrl: 'dist/templates/sign-in.html'
})
export class SignIn{

    private signInForm: ControlGroup;

    constructor(
        @Inject(OAuthService) private oAuthService: OAuthService,
        @Inject(FormBuilder) private fb: FormBuilder ) {

        this.signInForm = fb.group({
            "username": ["", Validators.required],
            "password":["", Validators.required]
        });
    }
    
    private onSignIn() {

        if(this.signInForm.status == "VALID") {
            var user: User = <User>this.signInForm.value;
            this.oAuthService.authUser(user);
        }
    }
}