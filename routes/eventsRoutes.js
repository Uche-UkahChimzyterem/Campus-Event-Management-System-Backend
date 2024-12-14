const express = require("express")
const router = express.Router()
const {getEvents, createEvent,getUserEvents,confirmRsvp, cancelRsvp} = require("../controllers/eventsController")

router.get("/getEvents", getEvents)
router.post("/createEvent", createEvent)
router.get("/getUserEvents/:id",getUserEvents)
router.post("/confirmRsvp",confirmRsvp)
router.delete("/cancelRsvp/:eventId",cancelRsvp)

module.exports = router