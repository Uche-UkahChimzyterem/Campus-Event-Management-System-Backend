Here is the corrected version of your documentation:

---

# Campus Event Management System Backend

This is the backend of a campus event management system built with Node.js and Supabase (PostgreSQL database) to handle user authentication, event creation, and RSVP management.

## What You Can Do with It
- **User Sign Up and Login**: Users can create accounts and log in with secure tokens.
- **Create and Manage Events**: Admins can create events, and everyone can view them.
- **RSVP to Events**: Users can RSVP to events, and the system will track available seats.
- **Roles for Admin and Users**: Different permissions for admins and regular users.

## Tools We Use
- **Node.js**: JavaScript runtime for building the server.
- **Express.js**: Web framework to build our API.
- **Supabase (PostgreSQL)**: Database to store users and events data.
- **bcryptjs**: Used for hashing passwords.

## Getting Started

### What You Need
- Install Node.js and npm.
- Set up Supabase (see below for details).

### How to Set It Up
1. Clone the repo to your computer:
   ```bash
   git clone https://github.com/Uche-UkahChimzyterem/Campus-Event-Management-System-Backend
   cd Campus-Event-Management-System-Backend
   ```
2. Install the required libraries:
   ```bash
   npm install
   ```
3. Set up environment variables (explained below).

4. Start the server:
   ```bash
   npm start
   ```

### Supabase Setup
1. Sign up for Supabase (if you haven't already): [Supabase](https://supabase.com/).
2. Create a new project in Supabase and get your SUPABASE_URL and SUPABASE_API_KEY from the project settings.
3. In your project folder, create a `.env` file and add:
   ```bash
   SUPABASE_URL=your_supabase_url
   SUPABASE_API_KEY=your_supabase_api_key
   JWT_SECRET=your_secret_key_for_tokens
   JWT_EXPIRES=expiration_time_for_tokens
   PORT=port_number_for_the_server
   ```

## API Endpoints

### For Authentication

#### Register User
- **Method**: `POST /api/auth/register`
- **Request Body**:
  ```json
  {
    "name": "Uche",
    "email": "uche@example.com",
    "password": "test1",
    "role": "user",
    "preferences": ["Club activities"]
  }
  ```
- **Postman Screenshot**:
  ![Register User Postman](./Images/Register_User.png)
- **Response**:
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### Login User
- **Method**: `POST /api/auth/login`
- **Request Body**:
  ```json
  {
    "email": "uche@example.com",
    "password": "test1"
  }
  ```
- **Postman Screenshot**:
  ![Login User Postman](./Images/Login_User.png)
- **Response**:
  ```json
  {
    "message": "Login successful"
  }
  ```

### For Events

#### Create Event (Admin Only)
- **Method**: `POST /api/events/create`
- **Request Body**:
  ```json
  {
    "name": "New Event",
    "description": "Description of the event",
    "date": "2024-12-30"
  }
  ```
- **Postman Screenshot**:
  ![Create Event Postman](./Images/Create_Event.png)
- **Response**:
  ```json
  {
    "message": "Event created successfully"
  }
  ```

#### Get All Events
- **Method**: `GET /api/events/allevents`
- **Postman Screenshot**:
  ![Get All Events Postman](./Images/Get_All_Events.png)
- **Response**:
  ```json
  {
    "events": [
      {
        "id": "982245f5-0ff7-4b97-b0d3-856183a5c4b3",
        "name": "Official Chattering Ceremony of NSBE",
        "description": "Learn more about NSBE Club.",
        "event_date": "2024-12-04",
        "event_time": "15:00:00",
        "location": "Auditorium",
        "capacity": 200,
        "available_seats": 200,
        "type": "Academics",
        "created_by": "df150fec-c5f1-4364-a19c-82f684bca1d6",
        "created_at": "2024-12-10T16:55:24.581Z"
      },
      {
        "id": "9cadde12-89e1-4ea1-a17b-8c8084c70ec7",
        "name": "Sustainability Workshop",
        "description": "Join us for an engaging Sustainability Workshop to learn practical ways to create a greener, more sustainable future!",
        "event_date": "2024-12-06",
        "event_time": "13:00:00",
        "location": "Tech Center",
        "capacity": 100,
        "available_seats": 100,
        "type": "Workshop",
        "created_by": "df150fec-c5f1-4364-a19c-82f684bca1d6",
        "created_at": "2024-12-10T17:01:20.583Z"
      }
    ]
  }
  ```

#### RSVP to Event
- **Method**: `POST /api/events/rsvp/confirm`
- **Request Body**:
  ```json
  {
    "event_id": "6c0f468d-b1f0-465d-b758-1c86475fe8df",
    "user_id": "df150fec-c5f1-4364-a19c-82f684bca1d6"
  }
  ```
- **Postman Screenshot**:
  ![RSVP to Event Postman](./Images/RSVP_Event.png)
- **Response**:
  ```json
  {
    "message": "RSVP confirmed successfully"
  }
  ```

#### Get User's RSVP'd Events
- **Method**: `GET /api/events/user/events/:userId`
- **Postman Screenshot**:
  ![Get User RSVP'd Events Postman](./Images/User_Rsvp_Event.png)
- **Response**:
  ```json
  [
    {
      "rsvp_id": "99a5f3ad-1132-4119-b1e6-f53b7bd1c93f",
      "status": "confirmed",
      "rsvp_created_at": "2024-12-14T17:11:10.640Z",
      "event_id": "6c0f468d-b1f0-465d-b758-1c86475fe8df",
      "name": "Girls Match Day",
      "description": "A Day to appreciate Females in Sports.",
      "event_date": "2024-12-23",
      "event_time": "09:00",
      "location": "Field",
      "capacity": 200,
      "available_seats": 199,
      "type": "{\"Club activities\"}",
      "created_by": "3240f955-31a2-46ec-9c65-e5c70be7d0d1",
      "event_created_at": "2024-12-14T17:08:40.142Z"
    }
  ]
  ```

#### Cancel RSVP
- Method: `DELETE /api/events/rsvp/cancel/:eventId`
- Postman Screenshot:
  ![Cancel RSVP Postman](./Images/cancel.png)
- Response:
  ```json
  {
    "message": "RSVP cancelled successfully"
  }
  ```

## Middleware
- **Authentication**: Middleware is used to protect certain routes.
  - `authenticate`: For admin routes.
  - `userAuthenticate`: For user routes.

## Database
We use Supabase as the database. The connection settings, such as URL and API key, are stored in the `.env` file.

## Contributing
Anyone can help! Fork the repo, make changes, and submit a pull request with improvements or bug fixes.

## Contact Information
For any inquiries or feedback, feel free to reach out to [uche-ukah.chimzyterem@gmail.com].

## License
This project is licensed under the MIT License. Check the LICENSE file for more details.

---
