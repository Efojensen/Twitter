import { Router } from 'express';
import { PrismaClient } from '@prisma/client'

const router = Router();
const prisma = new PrismaClient()
// TWEET CRUD endpoints

// CREATE a Tweet
router.post('/', async(req, res) => {
    const { content, image, userId } = req.body
    try {
        const result = await prisma.tweet.create({
            data: {
                content,
                image,
                userId
            }
        })
        res.json(result)
    } catch (error) {
        res.status(400).json({error: "Something went wrong"})
    }
})

// LIST Tweets
router.get('/', async (req, res) => {
    const allTweets = await prisma.tweet.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    username: true,
                    image: true
            }}},
    });
    res.json(allTweets)
})

// GET one Tweet
router.get('/:id', async (req, res) => {
    const {id} = req.params
    const tweet = await prisma.tweet.findUnique({ where: {id: Number(id) },
        include: {user: true}
    })
    if (!tweet){
        return res.status(404).json({error: "Tweet not found"})
    }
    res.json(tweet)
})

// UPDATE Tweet
router.put('/:id', async (req, res) => {
    const {id} = req.params
    const { content } = req.body

    try {
        const newTweet =  await prisma.tweet.update({
            where: {id: Number(id)},
            data: {
                // content
            }
        })
        res.json(newTweet)
    } catch (error) {
        res.status(400).json({error: "Failed to update tweet."})
    }
    res.status(501).json({error: `Not implemented: ${id}`})
})

// DELETE Tweet
router.delete('/:id', async (req, res) => {
    const {id} = req.params
    await prisma.tweet.delete({where: {id: Number(id)}})
    res.sendStatus(200);
});

export default router;