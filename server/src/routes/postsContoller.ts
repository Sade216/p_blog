// import type { Context } from "hono"

import type { Context } from "hono"
import { db } from "../db/index"
import { postsTable } from "../db/schema"
import { HTTPException } from "hono/http-exception"
import { eq } from "drizzle-orm"

export const postsGet = async () =>{
    const res = await db.select().from(postsTable)
    return res
}

export const postsCreate = async (c: Context) =>{
    try {
        const body = await c.req.parseBody()
        console.log(body)
        await db.insert(postsTable).values({ title: body.title.toString(), desc: body.desc.toString()});
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
        await db.update(postsTable).set({ title: body.title.toString(), desc: body.desc.toString()}).where(eq(postsTable.id, body.id.toString()));
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