import {observable, action, decorate} from 'mobx'
var groups = require('../data/groups.json');


class UserStore {
    
    userInfo = {
        id: null,
        username: "",
        first: "",
        last: "",
        address: "",
        password: "",
    };

    groups = groups.groups;
    allGroups = groups.groups;
}
decorate(UserStore, {
    userInfo: observable,
    groups: observable,
    allGroups: observable
})

const userStore = new UserStore();

export default userStore;