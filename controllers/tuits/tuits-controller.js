import posts from "./tuits.js";
let tuits = posts;
const createTuit = (req, res) => {
    const newTuit = req.body;
    newTuit._id = (new Date()).getTime() + ""
    newTuit.likes = 0
    newTuit.dislikes = 0
    newTuit.liked = false
    newTuit.image = "nasa.png"
    tuits.push(newTuit)
    res.json(newTuit)
}
const findTuits = (req, res) => {
    res.json(tuits);
}
const updateTuit = (req , res) => {
    const tuitId = req.params.id
    const updates = req.body
    const tuitIndex = tuits.findIndex((t) => t._id === tuitId)
    tuits[tuitIndex] = {...tuits[tuitIndex], ...updates}
    res.sendStatus(200)
}
const deleteTuit = (req, res) => {
    const tuitId = req.params.id
    tuits = tuits.filter((t) => t._id !== tuitId)
    res.sendStatus(200)
}

export default (app) => {
    app.get('/api/tuits', findTuits)
    app.post('/api/tuits', createTuit)
    app.put('/api/tuits/:id', updateTuit)
    app.delete('/api/tuits/:id', deleteTuit)
}