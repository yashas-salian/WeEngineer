import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { userRouter } from './router/user.route'
import { uploadRouter } from './router/upload.route'
import { pdfRouter } from './router/getPdf.route'
import { quizRouter } from './router/quiz.route'
import { eventRouter } from './router/event.route'

const app = new Hono()
app.use(cors())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/' , userRouter)
app.route('/' , uploadRouter)
app.route('/' , pdfRouter)
app.route('/' , quizRouter)
app.route('/' , eventRouter)
export default app
