import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve the public website static files
app.use(express.static(path.join(__dirname, '../public')));

// Serve the admin CMS static files under /admin
app.use('/admin', express.static(path.join(__dirname, '../admin')));

// Fallback: any unmatched route serves the public index
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🚀 Server running at http://localhost:${PORT}`);
  console.log(`   Public website: http://localhost:${PORT}`);
  console.log(`   Admin dashboard: http://localhost:${PORT}/admin\n`);
});
