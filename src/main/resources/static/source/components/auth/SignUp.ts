import {Component, Inject} from 'angular2/core';
import {ControlGroup, FormBuilder, Validators} from "angular2/common";
import {OAuthService} from '../../services/OAuthService';
import {User} from "../../models/User";
import {Router} from 'angular2/router';


@Component({
    selector:'signup',
    directives:[],
    templateUrl: 'dist/templates/sign-up.html'
})
export class SignUp{

    private signUpForm: ControlGroup;

    constructor(
        @Inject(OAuthService) private oAuthService: OAuthService,
        @Inject(FormBuilder) private fb: FormBuilder,
        @Inject(Router) private router: Router) {

        this.signUpForm = fb.group({
            "username": ["", Validators.required],
            "email": ["", Validators.required],
            "password": ["", Validators.required],
            "confirmPassword": ["", Validators.required]
        });
    }

    private onSignUp() {

        if(this.signUpForm.status == "VALID") {
            
            var user: User = <User>this.signUpForm.value;
                        
            this.oAuthService
                .signUpUser(user)
                .subscribe(
                    response => this.router.navigate(['SignIn']),
                    err  => console.log(err),
                    ()   => console.log("SignUp complete")
                );
        }
    }
}
