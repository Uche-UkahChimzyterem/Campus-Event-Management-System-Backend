const pool = require("../config/db")

const getEvents = async (req, res) => {
    const events = await pool.query("SELECT * FROM events")
    res.json({events: events.rows})
}

const createEvent = async (req, res) => {
    const {name, description, location, event_date, event_time, capacity, type, created_by} = req.body
    let available_seats = capacity  
    try{
        await pool.query("INSERT INTO events (name, description, location, event_date, event_time, capacity, available_seats, type, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [name, description, location, event_date, event_time, capacity, available_seats, type, created_by])
        res.json({message: "Event created successfully"})
    }catch(error){
        console.error(error)
        res.status(500).json({error: "Internal server error"})
    }
}

const getUserEvents = async (req, res) => {
  let { id } = req.params;
  console.log(`user_id: ${id}`);
  try {
    const query = `
            SELECT 
                rsvps.id AS rsvp_id,
                rsvps.status,
                rsvps.created_at AS rsvp_created_at,
                events.id AS event_id,
                events.name,
                events.description,
                events.event_date,
                events.event_time,
                events.location,
                events.capacity,
                events.available_seats,
                events.type,
                events.created_by,
                events.created_at AS event_created_at
            FROM 
                rsvps
            INNER JOIN 
                events 
            ON 
                rsvps.event_id = events.id
            WHERE 
                rsvps.user_id = $1
        `;

    const result = await pool.query(query, [id]);
    return res.status(200).json({ events: result.rows });
  } catch (error) {
    console.error("Error fetching user events:", error);
    return res.status(500).json({ error: "Error fetching user events" });
  }
};

const confirmRsvp = async (req, res) => {
  let { event_id, user_id } = req.body;
  console.log(`event_id: ${event_id} || user_id: ${user_id}`);

  if (!event_id || !user_id) {
    console.log("Event ID and user ID are required");
    return res.status(400).json({ error: "Event ID and user ID are required" });
  }
  
  try {  
    const event = await pool.query("SELECT * FROM events WHERE id = $1", [
      event_id,
    ]);
    if (event.rows[0].available_seats === 0) {
      return res.status(400).json({ error: "Event is already full" });
    }

    const existingRsvp = await pool.query(
      "SELECT * FROM rsvps WHERE event_id = $1 AND user_id = $2",
      [event_id, user_id]
    );
    if (existingRsvp.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "User has already RSVP'd for this event" });
    }

    await pool.query("INSERT INTO rsvps (event_id, user_id) VALUES ($1, $2)", [
      event_id,
      user_id,
    ]);
    await pool.query(
      "UPDATE events SET available_seats = available_seats - 1 WHERE id = $1",
      [event_id]
    );
    console.log("RSVP confirmed successfully");
    return res.status(200).json({ message: "RSVP confirmed successfully" });
  } catch (error) {
    console.error("Error confirming RSVP:", error);
    return res.status(500).json({ error: "Error confirming RSVP" });
  }
};

const cancelRsvp = async (req, res) => {
  let { eventId } = req.params;
  console.log(`event_id: ${eventId}`);
  try {
    await pool.query("DELETE FROM rsvps WHERE event_id = $1", [eventId]);
    await pool.query("UPDATE events SET available_seats = available_seats + 1 WHERE id = $1", [eventId]);
    return res.status(200).json({ message: "RSVP cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling RSVP:", error);
    return res.status(500).json({ error: "Error cancelling RSVP" });
  }
};

module.exports = {getEvents, createEvent, getUserEvents,confirmRsvp, cancelRsvp}