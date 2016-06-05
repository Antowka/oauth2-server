import {Component, Inject} from 'angular2/core';
import {SignInService} from '../../services/SignInService';
import {User} from '../../models/User';
import {ControlGroup, FormBuilder, Validators, Control} from "angular2/common";


@Component({
    selector:'signin',
    directives:[],
    templateUrl: 'dist/templates/sign-in.html'
})
export class SignIn{

    private signInForm: ControlGroup;
    private signInService: SignInService;

    constructor(@Inject(SignInService) signInService: SignInService, @Inject(FormBuilder) fb: FormBuilder ) {
        this.signInForm = fb.group({
            "username": ["", Validators.required],
            "password":["", Validators.required]
        });
        
        this.signInService = signInService;
    }
    
    private onSignIn() {

        if(this.signInForm.status == "VALID") {

            var user: User = <User>this.signInForm.value;
            this.signInService.authUser(user);
        }
    }
}