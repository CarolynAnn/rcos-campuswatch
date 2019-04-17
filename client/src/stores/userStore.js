import {observable, decorate} from 'mobx'
var groups = require('../data/groups.json');
var users = require('../data/users.json');
var discussions = require('../data/discussions.json')
var alerts = require('../data/alerts.json');
var messages= require('../data/messages.json');
class UserStore {
    
    userInfo = {
      id: 0,
      first_name: "",
      last_name: "",
      rcs_id: "",
      password: "",
      address: "",
      picture_location: null,
      role_id: 1
    }
    
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