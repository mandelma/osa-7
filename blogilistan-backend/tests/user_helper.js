const User = require('../models/users')

const initialUsers = [
    {
        username: "root",
        name: "Testaaja",
        password: "test"
    },
    {
        username: "secRoot",
        name: "Tester2",
        password: "uustest"
    }
]

const loginInfo = {
    username: "root",
    password: "test"
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(note => note.toJSON())
}


module.exports = {
    initialUsers,
    loginInfo,
    usersInDb
}