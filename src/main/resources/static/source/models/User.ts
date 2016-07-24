import {UserAuthorities} from "./UserAuthorities";

export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    birthday: string;
    password: string;
    authorities: UserAuthorities[];
}
