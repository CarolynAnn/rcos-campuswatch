import {observable, action, decorate} from 'mobx'

class UserStore {
    
    userInfo = {
        id: null,
        username: "",
        password: ""
    };

    constructor() {
        this.userInfo = {
            id: null,
            username: "nate",
            password: "abc"
        }
    }
}
decorate(UserStore, {
    userInfo: observable
})

const userStore = new UserStore();

export default userStore;