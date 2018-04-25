class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        let user = { id, name, room };
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        //return user that was removed
        //let user = this.users.filter((user) => user.id === id)[0];
        let user = this.getUser(id);

        if (user) {
            this.user = this.users.filter((user) => user.id !== id);
        }
        return user;

    }
    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];


    }
    getUserList(room) {
        let users = this.users.filter((user) => user.room === room);
        let namesArray = users.map((user) => user.name);
        return namesArray;
    }
};

module.exports = { Users };





// class Person {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescription() {
//         return `${this.name} is ${this.age} years old`;
//     }
// }
// const me = new Person('Elivan', 37); //the me is the this
// // console.log('this.name', me.name);
// // console.log('this.age', me.age);
// const description = me.getUserDescription();
// console.log(description);