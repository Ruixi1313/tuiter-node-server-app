import * as tuitsDao from "./tuits-dao.js"
const createTuit = async(req, res) => {
    const newTuit = req.body;
    newTuit.likes = 0
    newTuit.dislikes = 0
    newTuit.liked = false
    newTuit.image = "nasa.png"
    const insertedTuit = await tuitsDao.createTuit(newTuit)
    res.json(insertedTuit)
}
const findTuits = async(req, res) => {
    const tuits = await tuitsDao.findTuits()
    res.json(tuits);
}
const updateTuit = async(req , res) => {
    const tuitId = req.params.id
    const updates = req.body
    const status = await tuitsDao.updateTuit(tuitId,updates)
    res.json(status)
}

const deleteTuit = async (req, res) => {
    const tuitdIdToDelete = req.params.id;
    const status = await tuitsDao.deleteTuit(tuitdIdToDelete);
    res.json(status);
  }
  

export default (app) => {
    app.get('/api/tuits', findTuits)
    app.post('/api/tuits', createTuit)
    app.put('/api/tuits/:id', updateTuit)
    app.delete('/api/tuits/:id', deleteTuit)
}