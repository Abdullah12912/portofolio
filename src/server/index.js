import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './config/db.js';

import authRouter from './routes/auth.js';
import errorMiddleware from './middleware/error.middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Body & cookie parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve the public website static files
app.use(express.static(path.join(__dirname, '../public')));

// Serve the admin CMS static files under /admin
app.use('/admin', express.static(path.join(__dirname, '../admin')));

// API Routes
app.use('/api/auth', authRouter);

// Fallback: any unmatched route serves the public index
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Centralized error handler
app.use(errorMiddleware);

// Verify DB connection and start server
async function startServer() {
  const dbHost = process.env.DB_HOST || 'localhost';
  const dbName = process.env.DB_NAME || 'portofolio';
  const dbPort = process.env.DB_PORT || '5432';

  try {
    // Attempt connection
    const client = await db.getClient();
    console.log(`\n✓ PostgreSQL Connected\nHost: ${dbHost}\nDatabase: ${dbName}\nPort: ${dbPort}\n`);
    client.release();

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`   Public website: http://localhost:${PORT}`);
      console.log(`   Admin dashboard: http://localhost:${PORT}/admin\n`);
    });
  } catch (err) {
    console.error(`\n✗ PostgreSQL Connection Failed\nHost: ${dbHost}\nDatabase: ${dbName}\nPort: ${dbPort}\n\nReason:\n${err.message}\n`);
    process.exit(1);
  }
}

startServer();
