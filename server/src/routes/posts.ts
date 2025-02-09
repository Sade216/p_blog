import { Hono } from "hono";
import { postsGet, postsCreate, postsUpdate, postsDelete, commentCreate, commentDelete } from "./postsContoller";

export const postsRoutes = new Hono()
    //Get all posts
    .get('/', async (c) => {
        const res = await postsGet()
        return c.json(res)
    })
    //Create post
    .post('/', async (c) => {
        const res = await postsCreate(c)
        return c.json(res)
    })
    .put('/', async (c) => {
        const res = await postsUpdate(c)
        return c.json(res)
    })
    //Delete post
    .delete('/', async (c) => {
        const res = await postsDelete(c)
        return c.json({})

    })
    //Create comment
    .post('/comment', async (c) => {
        const res = await commentCreate(c)
        return c.json({})

    })
    .delete('/comment', async (c) => {
        const res = await commentDelete(c)
        return c.json({})

    })