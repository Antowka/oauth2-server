import {UserAuthorities} from "./UserAuthorities";

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    authorities: UserAuthorities[];
}
