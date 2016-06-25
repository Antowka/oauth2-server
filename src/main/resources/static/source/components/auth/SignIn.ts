import {Component, Inject, Injectable} from 'angular2/core';
import {OAuthService} from '../../services/OAuthService';
import {User} from '../../models/User';
import {ControlGroup, FormBuilder, Validators} from "angular2/common";
import {Router} from 'angular2/router';
import {Config} from '../../config/Config';

@Injectable()
@Component({
    selector:'signin',
    directives:[],
    templateUrl: 'dist/templates/sign-in.html'
})
export class SignIn{

    private signInForm: ControlGroup;
    private storageItemName : string;

    constructor(
        @Inject(OAuthService) private oAuthService: OAuthService,
        @Inject(FormBuilder) private fb: FormBuilder,
        @Inject(Router) private router: Router,
        @Inject(Config) private config: Config) {

        this.signInForm = fb.group({
            "username": ["", Validators.required],
            "password":["", Validators.required]
        });

        this.storageItemName = config.storageItemName;
    }

    public signOut() {
        localStorage.removeItem(this.storageItemName);
        this.router.navigate(['SignIn']);
    }

    public isAuth() : boolean {
        //check also expired token
        if(localStorage.getItem(this.storageItemName)){
            return true
        }
        
        return false;
    }

    private onSignIn() {

        if(this.signInForm.status == "VALID") {
            var user: User = <User>this.signInForm.value;
            this.oAuthService
                .authUser(user, (isAuthorized, messege) => {
                    
                    if(isAuthorized) {
                        this.router.navigate(['AdminPanel']);
                    } else {
                        console.log(messege);
                    }
                });
        }
    }
}