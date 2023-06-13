import * as usersDao from "./users-dao.js"
var currentUserVar;
const AuthController = (app) => {
    const register = (req, res) => {
        const username = req.body.username;
        console.log("username",username)
        const user = usersDao.findUserByUsername(username);
        if (user) {
            res.sendStatus(409)
            return
        }
        console.log(req.body)
        const newUser = { ...req.body, _id: new Date().getTime() + "",firstName: req.body.firstName,lastName: req.body.lastName}
        usersDao.createUser(newUser)
        // req.session["currentUser"] = newUser
        currentUserVar = newUser
        res.json(newUser)
    };

    const login = (req, res) => {
        console.log(req)
        const username = req.body.username
        const password = req.body.password
        if (username && password) {
            const user = usersDao.findUserByCredentials(username, password)
            if (user) {
                currentUserVar = user
                res.json(user)
            } else {
                res.sendStatus(404)
            }
        } else {
            res.sendStatus(404)
        }
    };

    const profile = (req, res) => {
        const currentUser = currentUserVar
        if (!currentUser) {
            res.sendStatus(404)
            return
        }
        res.json(currentUser)
    };

    const logout = (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    };

    const update = (req, res) => {
        const currentUser = currentUserVar
        if (!currentUser) {
            res.sendStatus(404);
            return;
        }
        const uid = currentUser._id;
        const updatedUser = req.body;
        const result = usersDao.updateUser(uid, updatedUser);
        if (result.status === 'ok') {
            currentUserVar = { ...currentUser, ...updatedUser };
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    };

    app.post("/api/users/register", register);
    app.post("/api/users/login", login);
    app.post("/api/users/profile", profile);
    app.post("/api/users/logout", logout);
    app.put("/api/users/:_id", update)
};
export default AuthController;