import {observable, action, decorate} from 'mobx'

// id SERIAL PRIMARY KEY ,
//     first_name varchar(31) NOT NULL,
//     last_name varchar(31) NOT NULL,
//     rcs_id varchar(15) NOT NULL UNIQUE,
//     password varchar(63) NOT NULL,
//     address varchar(63) NOT NULL,
//     picture_location varchar(255),
//     role_id int NOT NULL

class UserStore {
    
    userInfo = {
        id: null,
        username: "",
        first: "",
        last: "",
        address: "",
        password: "",


    };

}
decorate(UserStore, {
    userInfo: observable
})

const userStore = new UserStore();

export default userStore;