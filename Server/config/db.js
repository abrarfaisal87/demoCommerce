import  dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {PG_USER, PG_PASSWORD, PG_HOST, PG_PORT, PG_DATABASE} = process.env;


//creating a sql connection using env variables
const pool = new Pool({
    user:process.env.PG_USER,
    password:process.env.PG_PASSWORD,
    host:process.env.PG_HOST,
    port:process.env.PG_PORT,
    database:process.env.PG_DATABASE,
    ssl:{
        rejectUnauthorized:false , //important for supabse connection
    }
});

export default pool;