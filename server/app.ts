import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { userRoutes } from './routes/user'
import { serveStatic } from 'hono/bun'

const app = new Hono()

app.use("*", logger())

const apiRoutes = app.basePath('/api')
    .route('/user', userRoutes)
    // .route('/news', newsRoutes)
    // .route('/music', musicRoutes)


app.get('*', serveStatic({ root:'././frontend/dist'}))
app.get('*', serveStatic({ path:'././frontend/dist/index.html'}))

export default app

export type ApiRoutes = typeof apiRoutes