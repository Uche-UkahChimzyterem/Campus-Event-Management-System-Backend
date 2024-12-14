const {Pool} = require("pg")

const connectionString = "postgresql://postgres.moexsfuiagsqcbwljijr:p5X_EiBC$58UTia@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"

const pool = new Pool({
  connectionString:connectionString,
  ssl:{
    rejectUnauthorized:false
  }
})

pool.connect().then(()=>console.log(`Connected to Postgres Database successful`)).catch(err=>console.log(`Failed to connect to database`, err))

module.exports = pool