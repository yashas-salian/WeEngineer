import { Hono } from "hono"
import { eventController } from "../controller/event.controller"

export const eventRouter = new Hono()

eventRouter.post('/add-event',eventController.addEvent)
eventRouter.get('/get-events',eventController.getEvent)
eventRouter.put('/update-event',eventController.update)
eventRouter.delete('/delete-event',eventController.delete)