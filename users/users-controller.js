import people from "./users.js"
let users = people
const UserController = (app) => {
        const findAllUsers = (req, res) => {
            const username = req.query.username;
            const password = req.query.password;
            if (username && password) {
                const user = users.find(
                    (user) => user.username === username && user.password === password
                );
                if (user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            } else if (username) {
                const user = users.find((user) => user.username === username);
                if (user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            } else {
                setTimeout(() => {
                    // res.sendStatus(404);
                    res.json(users);
                }, 2000);
            }
        };

    const findUserById = (req, res) => {
        const userId = req.params.uid;
        const user = users.find(u => u._id === userId)
        res.json(user)
    }

    const createUser = (req, res) => {
        const newUser = { ...req.body, _id: (new Date()).getTime() + "" }
        // const newUser = req.body 
        // newUser._id = (new Date()).getTime() + '' ;
        users.push(newUser)
        res.json(newUser)
    }

    const deleteUser = (req, res) => {
        const userId = req.params['uid'];
        users = users.filter(usr => usr._id !== userId)
        res.sendStatus(200)
    }

    const updateUser = (req, res) => {
        const userId = req.params['uid']
        const updates = req.body
        users = users.map((usr) => usr._id === userId ? { ...usr, ...updates } : usr)
        res.sendStatus(200)
    }
    
    app.get("/api/users", findAllUsers)
    app.get("/api/users/:uid", findUserById)
    app.post("/api/users", createUser)
    app.delete("/api/users/:uid", deleteUser)
    app.put("/api/users/:uid", updateUser)
}
export default UserController;