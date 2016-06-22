import {Component, Inject, Injectable} from 'angular2/core';
import {OAuthService} from '../../services/OAuthService';
import {User} from '../../models/User';
import {ControlGroup, FormBuilder, Validators} from "angular2/common";
import {Router} from 'angular2/router';

@Injectable()
@Component({
    selector:'signin',
    directives:[],
    templateUrl: 'dist/templates/sign-in.html'
})
export class SignIn{

    private signInForm: ControlGroup;
    public isAuthorized: boolean = false;

    constructor(
        @Inject(OAuthService) private oAuthService: OAuthService,
        @Inject(FormBuilder) private fb: FormBuilder,
        @Inject(Router) private router: Router) {

        this.signInForm = fb.group({
            "username": ["", Validators.required],
            "password":["", Validators.required]
        });
    }
    
    private onSignIn() {

        if(this.signInForm.status == "VALID") {
            var user: User = <User>this.signInForm.value;
            this.oAuthService
                .authUser(user, (isAuthorized, messege) => {

                    this.isAuthorized = isAuthorized;

                    if(isAuthorized) {
                        this.router.navigate(['AdminPanel']);
                    } else {
                        console.log(messege);
                    }
                });
        }
    }
}