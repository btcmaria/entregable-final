const User = require("../../models/User")

const userCreate = async () =>{

    const user = {
        firstName:"Maria",
        lastName:"Lizarraga",
        email:"maria@gmail.com",
        password:"maria123",
        phone:"123456789"
    }

    

     await User.create(user)

}
module.exports = userCreate