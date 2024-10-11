export interface LoginResponseData {
    access_token: string;
    token_type: string;
    message: string;
}


export interface CredentialUser {
    email: string;
    password: string;
}
