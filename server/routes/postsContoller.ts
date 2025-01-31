import type { Context } from "hono"

export const postsGet = () =>{
    let res = [{
        id: '1',
        title: 'Title123',
        desc: 'desc333',
    }] 
    return res
}