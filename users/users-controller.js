import * as userDao from "./users-dao.js"

const UserController = (app) => {
        const findAllUsers = async(req, res) => {
            const username = req.query.username;
            const password = req.query.password;
            console.log("req.query",req.query)
            console.log("username",username)
            console.log("password",password)
            if (username && password) {
                const user = await userDao.findUserByCredentials(username,password)
                if (user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            } else if (username) {
                const user = await userDao.findUserByUsername(username)
                if (user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            } else {
                console.log("yes")
                const users = await userDao.findAllUsers()
                res.json(users)
            }
        };

    const findUserById = async(req, res) => {
        const userId = req.params.uid;
        const user = await userDao.findUserById(userId)
        res.json(user)
    }

    const createUser = async(req, res) => {
        const newUser = await userDao.createUser(req.body) 
        res.json(newUser)
    }

    const deleteUser = async(req, res) => {
        const userId = req.params['uid'];
        const status = userDao.deleteUser(userId)
        res.json(status)
    }

    const updateUser = async(req, res) => {
        const userId = req.params['uid']
        const updates = req.body
        const status = await userDao.updateUser(userId,updates)
        const user = await userDao.findUserById(userId)
        req.session["currentUser"] = user;
        res.json(status)
    }
    
    app.get("/api/users", findAllUsers)
    app.get("/api/users/:uid", findUserById)
    app.post("/api/users", createUser)
    app.delete("/api/users/:uid", deleteUser)
    app.put("/api/users/:uid", updateUser)
}
export default UserController;