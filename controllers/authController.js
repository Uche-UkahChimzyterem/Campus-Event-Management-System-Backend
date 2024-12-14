const pool = require("../config/db")
const bcrypt = require("bcryptjs")

const Register = async (req,res) =>{
  const {name, email, password, role, preferences} = req.body
  console.log(`${name} ${email} ${password} ${role} ${preferences}`)

  if(!name && !email && !password && !role && preferences.length === 0){
    console.log("All fields are required")
    return res.status(400).json({message: "All fields are required"})
  }
  try{
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await pool.query("INSERT INTO users (name, email, password, role, preferences) VALUES ($1, $2, $3, $4, $5) RETURNING *", [name, email, hashedPassword, role, preferences])
    console.log(`User registered successfully: ${result.rows[0]}`)
    res.json({message: "User registered successfully", user: result.rows[0]})
  }catch(error){
    console.error("Error registering user", error)
    res.status(500).json({message: "Internal server error"})
  }
}

const Login = async (req,res) =>{
  const {email, password} = req.body
  console.log(`${email} ${password}`)

  if(!email || !password){
    console.log("All fields are required")
    return res.status(400).json({message: "All fields are required"})
  }
  try{
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email])
    if(result.rows.length === 0){
      return res.status(401).json({message: "Invalid email or password"})
    }
    const user = result.rows[0]
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if(!isPasswordCorrect){
      return res.status(401).json({message: "Invalid email or password"})
    }
    console.log(`Login successful: ${user}`)
    res.json({message: "Login successful", user: user})
  }catch(error){
    console.error("Error logging in", error)
    res.status(500).json({message: "Internal server error"})
  }
}

module.exports = {Register, Login}