/**
 * Library admin, who has rights to control.
 */
class AdminModel {
    /**
     * Admin's login.
     */
    private _login: string;

    /**
     * Admin's password.
     */
    private _password: string;

    constructor(login: string, password: string) {
        this._login = login;
        this._password = password;
    }

    get login(): string {
        return this._login;
    }

    get password(): string {
        return this._password;
    }
}