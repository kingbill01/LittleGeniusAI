import { getPgPool } from './PgPool';
import * as fs from 'fs';
import * as path from 'path';
import { app } from 'electron';

export interface DataMigration {
  migrateJsonToPostgres(): Promise<void>;
}

export class DataMigrator implements DataMigration {
  private dataPath: string;

  constructor() {
    this.dataPath = path.join(app.getPath('userData'), 'littlegenius');
  }

  async migrateJsonToPostgres(): Promise<void> {
    const pool = getPgPool();
    if (!pool) {
      console.log('PostgreSQL not available, skipping migration');
      return;
    }

    console.log('Starting data migration from JSON to PostgreSQL...');

    try {
      // Check if tables have data
      const userCount = await pool.query('SELECT COUNT(*) FROM users');
      if (parseInt(userCount.rows[0].count) > 0) {
        console.log('Users table already has data, skipping migration');
        return;
      }

      // Migrate users
      await this.migrateUsers(pool);
      
      // Migrate progress
      await this.migrateProgress(pool);

      console.log('Data migration completed successfully');
    } catch (error) {
      console.error('Error during migration:', error);
      throw error;
    }
  }

  private async migrateUsers(pool: any): Promise<void> {
    const usersFile = path.join(this.dataPath, 'users.json');
    if (!fs.existsSync(usersFile)) {
      console.log('No users.json file found, skipping user migration');
      return;
    }

    const usersData = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
    console.log(`Migrating ${usersData.length} users...`);

    for (const user of usersData) {
      try {
        await pool.query(
          `INSERT INTO users (id, name, age, avatar, created_at, time_limit, allowed_subjects, difficulty, voice_enabled, voice_id)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
           ON CONFLICT (id) DO NOTHING`,
          [
            user.id,
            user.name,
            user.age,
            user.avatar,
            user.createdAt,
            user.parentalControls?.timeLimit || null,
            user.parentalControls?.allowedSubjects || [],
            user.parentalControls?.difficultyLevel || 'beginner',
            user.voicePreferences?.enabled ?? true,
            user.voicePreferences?.voiceId || null
          ]
        );
      } catch (error) {
        console.error(`Error migrating user ${user.id}:`, error);
      }
    }
  }

  private async migrateProgress(pool: any): Promise<void> {
    const progressFile = path.join(this.dataPath, 'progress.json');
    if (!fs.existsSync(progressFile)) {
      console.log('No progress.json file found, skipping progress migration');
      return;
    }

    const progressData = JSON.parse(fs.readFileSync(progressFile, 'utf8'));
    console.log(`Migrating ${progressData.length} progress records...`);

    for (const progress of progressData) {
      try {
        await pool.query(
          `INSERT INTO progress (user_id, subject, level, score, time_spent, completed_activities, achievements, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           ON CONFLICT (user_id, subject) DO UPDATE SET
             level = EXCLUDED.level,
             score = EXCLUDED.score,
             time_spent = EXCLUDED.time_spent,
             completed_activities = EXCLUDED.completed_activities,
             achievements = EXCLUDED.achievements,
             updated_at = EXCLUDED.updated_at`,
          [
            progress.userId,
            progress.subject,
            progress.level || 1,
            progress.score || 0,
            progress.timeSpent || 0,
            progress.completedActivities || [],
            progress.achievements || [],
            progress.updatedAt || new Date().toISOString()
          ]
        );
      } catch (error) {
        console.error(`Error migrating progress for user ${progress.userId}:`, error);
      }
    }
  }
}