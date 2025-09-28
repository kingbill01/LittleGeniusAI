import { Pool } from 'pg';
import * as path from 'path';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

// Load env (also allow .env in project root packaged)
const rootDir = path.join(__dirname, '..', '..');
const envFile = path.join(rootDir, '.env');
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
} else {
  dotenv.config();
}

let _pool: Pool | null = null;

export function getPgPool() {
  if (_pool) return _pool;
  const { PGHOST, PGPORT, PGDATABASE, PGUSER, PGPASSWORD, DATABASE_URL } = process.env as Record<string,string>;

  if (DATABASE_URL) {
    _pool = new Pool({ connectionString: DATABASE_URL, max: 5 });
  } else {
    if (!PGHOST || !PGDATABASE || !PGUSER) {
      console.warn('[DB] Missing PostgreSQL configuration. Falling back to file storage.');
      return null;
    }
    _pool = new Pool({
      host: PGHOST,
      port: PGPORT ? parseInt(PGPORT, 10) : 5432,
      database: PGDATABASE,
      user: PGUSER,
      password: PGPASSWORD,
      max: 5,
    });
  }
  return _pool;
}

export async function testPgConnection(): Promise<boolean> {
  try {
    const pool = getPgPool();
    if (!pool) return false;
    await pool.query('SELECT 1');
    console.log('[DB] PostgreSQL connection OK');
    return true;
  } catch (e) {
    console.error('[DB] PostgreSQL connection error:', e);
    return false;
  }
}
