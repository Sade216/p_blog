import { Hono } from "hono";

export const userRoutes = new Hono()
    .get('/', c => {
        return c.json({
            "name": 'Vlad'
        })
    })