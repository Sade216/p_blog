import { Hono } from "hono";
import { postsGet } from "./postsContoller";

export const postsRoutes = new Hono()
    .get('/', async (c) => {
        const res = postsGet()
        return c.json(res)

    })