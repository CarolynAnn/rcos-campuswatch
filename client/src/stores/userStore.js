import {observable, action, decorate} from 'mobx'
var groups = require('../data/groups.json');
var users = require('../data/users.json');
var discussions = require('../data/discussions.json')
var alerts = require('../data/alerts.json');
class UserStore {
    
    userInfo = users.users[0];
    groups = groups.groups;
    allGroups = groups.groups;
    users= users.users;
    alerts = alerts.alerts;
    discussions = discussions.discussions;
    replies = discussions.replies;
    loggedIn = false;
}
decorate(UserStore, {
    userInfo: observable,
    groups: observable,
    allGroups: observable,
    users: observable,
    alerts: observable,
    replies: observable,
    loggedIn: observable
})

const userStore = new UserStore();

export default userStore;