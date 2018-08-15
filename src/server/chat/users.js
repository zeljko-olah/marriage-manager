[{
  id: '/#12hjwjhwfcydg',
  name: 'Andrew',
  room: 'The Office Fans'
}]

// Define class Users
class Users {

  // Constructor
  constructor(){
    // Initialize users property {array}
    this.users = [];
  }

  // Methods

  /*
   * Add User Method
   * @param {string} id - Socket id 
   * @param {string} name - Name that user has entered 
   * @param {string} room - Name of the room that user want to join
   * @returns {object} - Return the added user object
   */
  
  addUser(id, user, room){
    // Create user object
    const { name, email, avatar } = user
    var newUser = {id, name, email, avatar, room};
    // Add user object to users class array
    this.users.push(newUser);
    // Return the added user object
    return user
  }
  
  /*
   * Remove User Method
   * @param {string} id - Socket id 
   * @returns {object} - Return deleted user object
   */
  removeUser(id){
    var user = this.getUser(id);
    
    // If there is user with id then remove it form users array
    if(user) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    
    // Return deleted user
    return user;
  }
  
    
  /*
   * Get User Method
   * @param {string} id - Socket id 
   * @returns {object} - Return user object form filtered users array
   */
  getUser(id){
    return this.users.filter((user) => user.id === id)[0]
  }
  
  /*
   * Get Users List Method
   * @param {string} room - Name of the chat room 
   * @returns {array} - Return array of all users that belong to chat room
   */
  getUserList(room){
      // Get all the users from chat room
      var users = this.users.filter((user) => user.room === room);
      // Get just their user names into an array
      // var namesArray = users.map((user) => user.name);
      
      // Return array of user names
      // return namesArray;
      return users
  }
}

// Export Users class
module.exports = {Users};

// class Person{
//   constructor(name, age){
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription(){
//     return `${this.name} is ${this.age} year(s) old.`;
//   }
// }
// var me = new Person('Andrew', 25);
// var description = me.getUserDescription();
// console.log(description);
