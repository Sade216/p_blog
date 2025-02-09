import type { Context } from "hono"
import { db } from "../db/index"
import { commentsTable, postsTable } from "../db/schema"
import { HTTPException } from "hono/http-exception"
import { eq } from "drizzle-orm"

export const postsGet = async () => {
    try {
        const res = await db.query.post.findMany({
            with: {
                comments: true, 
            },
        })
        return res;
    } catch (e) {
        throw new HTTPException(400, { cause: e })
    }
};

export const postsCreate = async (c: Context) =>{
    try {
        const body = await c.req.parseBody()
        await db.insert(postsTable).values({ title: body.title.toString(), description: body.description.toString()});
        return c.json({
            status: 200
        })
    }
    catch(e){
        throw new HTTPException(400, { cause: e })
    }
}

export const postsUpdate = async (c: Context) =>{   
    try {
        const body = await c.req.parseBody()
        await db.update(postsTable).set({ title: body.title.toString(), description: body.description.toString()}).where(eq(postsTable.id, body.id.toString()));
        return c.json({
            status: 200
        })
    }
    catch(e){
        throw new HTTPException(400, { cause: e })
    }
}

export const postsDelete = async (c: Context) =>{
    try {
        const id = c.req.query('id')
        if(typeof id === 'string'){
            await db.delete(postsTable).where(eq(postsTable.id, id));
        }
        return c.json({
            status: 200
        })
    }
    catch(e){
        throw new HTTPException(400, { cause: e })
    }
}



export const commentCreate = async (c: Context) =>{
    try {
        const body = await c.req.parseBody()
        await db.insert(commentsTable).values({ text: body.text.toString(), post_id: body.post_id.toString()});
        return c.json({
            status: 200
        })
    }
    catch(e){
        throw new HTTPException(400, { cause: e })
    }
}

export const commentDelete = async (c: Context) =>{
    try {
        const id = c.req.query('id')
        if(typeof id === 'string'){
            await db.delete(commentsTable).where(eq(commentsTable.id, id));
        }
        return c.json({
            status: 200
        })
    }
    catch(e){
        throw new HTTPException(400, { cause: e })
    }
}