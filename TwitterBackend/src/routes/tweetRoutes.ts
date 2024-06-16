import { Router } from 'express';

const router = Router();
// TWEET CRUD endpoints

// CREATE a Tweet
router.post('/', (req, res) => {
    res.status(501).json({error: "Not implemented"})
})

// LIST Tweets
router.get('/', (req, res) => {
    res.status(501).json({error: "Not implemented"})
})

// GET one Tweet
router.get('/:id', (req, res) => {
    const {id} = req.params
    res.status(501).json({error: `Not implemented: ${id}`})
})

// UPDATE Tweet
router.put('/:id', (req, res) => {
    const {id} = req.params
    res.status(501).json({error: `Not implemented: ${id}`})
})

// DELETE Tweet
router.delete('/:id', (req, res) => {
    const {id} = req.params
    res.status(501).json({error: `Not implemented: ${id}`})
})

export default router;

