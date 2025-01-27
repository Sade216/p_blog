import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { userRoutes } from './routes/user'

const app = new Hono().basePath('api')

app.use('/', logger())
app.get('/docs', c => {
    return c.json({
        "message": 'Документация к API.',
    })
})
app.route('/user', userRoutes)
// app.route('/news', newsRoutes)
// app.route('/music', musicRoutes)

export default app