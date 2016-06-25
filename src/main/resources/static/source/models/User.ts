export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    token: string;
    refreshToken: string;
    _links:any;
}
