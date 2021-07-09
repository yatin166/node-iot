import { Api } from "./Api"

const Path = {
    Base: 'http://localhost:8000/api/v1/',
    AllUsers: '/user/all',
}

export class Authentication extends Api {

    constructor() {
        super(Path.Base)
    }

    public async getAllUsers() {
        return this.http.get(Path.AllUsers);
    }
}