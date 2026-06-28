import pg from 'pg';

const { Pool } = pg;

// Read config from environment variables
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME || 'portofolio',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
});

// Log pooling errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle database client', err);
});

export default {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect(),
  pool,
};
