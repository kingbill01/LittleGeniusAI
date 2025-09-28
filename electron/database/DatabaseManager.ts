import * as fs from 'fs';
import * as path from 'path';
import { app } from 'electron';
import { getPgPool, testPgConnection } from './PgPool';
import { DataMigrator } from './DataMigrator';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  avatar: string;
  createdAt: string;
  parentalControls: {
    timeLimit?: number;
    allowedSubjects: string[];
    difficultyLevel: 'easy' | 'medium' | 'hard';
  };
  voicePreferences?: {
    enabled: boolean;
    voiceId?: string;
  };
}

export interface UserProgress {
  userId: string;
  subject: string;
  level: number;
  score: number;
  timeSpent: number;
  completedActivities: string[];
  achievements: string[];
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  ageGroup: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'quiz' | 'game' | 'exercise' | 'creative';
  content: any;
  estimatedTime: number;
}

export class DatabaseManager {
  private dataPath: string;
  private usersFile: string;
  private progressFile: string;
  private activitiesFile: string;
  private pgEnabled: boolean = false;

  constructor() {
    this.dataPath = path.join(app.getPath('userData'), 'littlegenius');
    this.usersFile = path.join(this.dataPath, 'users.json');
    this.progressFile = path.join(this.dataPath, 'progress.json');
    this.activitiesFile = path.join(this.dataPath, 'activities.json');
    this.initializeStorage();
    this.initializePg();
  }

  private initializeStorage(): void {
    // Créer le dossier de données s'il n'existe pas
    if (!fs.existsSync(this.dataPath)) {
      fs.mkdirSync(this.dataPath, { recursive: true });
    }

    // Initialiser les fichiers JSON s'ils n'existent pas
    if (!fs.existsSync(this.usersFile)) {
      fs.writeFileSync(this.usersFile, JSON.stringify([], null, 2));
    }
    
    if (!fs.existsSync(this.progressFile)) {
      fs.writeFileSync(this.progressFile, JSON.stringify([], null, 2));
    }
    
    if (!fs.existsSync(this.activitiesFile)) {
      this.seedInitialData();
    }
  }

  private async initializePg() {
    const ok = await testPgConnection();
    this.pgEnabled = ok;
    if (ok) {
      await this.ensurePgSchema();
      // Run migration if needed
      const migrator = new DataMigrator();
      await migrator.migrateJsonToPostgres();
    }
  }

  private async ensurePgSchema() {
    const pool = getPgPool();
    if (!pool) return;
    await pool.query(`CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      age INT NOT NULL,
      avatar TEXT,
      created_at TIMESTAMP NOT NULL,
      time_limit INT,
      allowed_subjects TEXT[] NOT NULL,
      difficulty TEXT NOT NULL,
      voice_enabled BOOLEAN DEFAULT true,
      voice_id TEXT
    );`);
    await pool.query(`CREATE TABLE IF NOT EXISTS progress (
      user_id TEXT NOT NULL,
      subject TEXT NOT NULL,
      level INT NOT NULL,
      score INT NOT NULL,
      time_spent INT NOT NULL,
      completed_activities TEXT[] NOT NULL,
      achievements TEXT[] NOT NULL,
      updated_at TIMESTAMP NOT NULL,
      PRIMARY KEY (user_id, subject)
    );`);
    await pool.query(`CREATE TABLE IF NOT EXISTS activities_results (
      user_id TEXT NOT NULL,
      activity_id TEXT NOT NULL,
      score INT NOT NULL,
      time_taken INT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );`);
  }

  private seedInitialData(): void {
    const sampleActivities = [
      {
        id: 'activity-1',
        title: 'Couleurs et Formes',
        description: 'Apprends les couleurs de base et les formes géométriques',
        ageGroup: '3-5',
        subject: 'math',
        difficulty: 'easy',
        type: 'game',
        content: {
          exercises: [{
            question: { fr: "Combien de cercles vois-tu ?", en: "How many circles do you see?", cs: "Kolik kruhů vidíš?" },
            objects: "🔵🔵🔵",
            answer: 3
          }]
        },
        estimatedTime: 10
      },
      {
        id: 'activity-2',
        title: 'Alphabet Magique',
        description: 'Découvre les lettres de l\'alphabet avec des animations',
        ageGroup: '3-5',
        subject: 'language',
        difficulty: 'easy',
        type: 'exercise',
        content: {
          letters: [
            { 
              letter: "A", 
              words: { 
                fr: { word: "Abeille", image: "🐝" }, 
                en: { word: "Ant", image: "🐜" }, 
                cs: { word: "Autobus", image: "🚌" } 
              } 
            }
          ]
        },
        estimatedTime: 15
      },
      {
        id: 'activity-3',
        title: 'Sciences de la Nature',
        description: 'Découvre les merveilles de la nature',
        ageGroup: '6-8',
        subject: 'science',
        difficulty: 'medium',
        type: 'experiment',
        content: {
          weather: [
            { type: { fr: "Ensoleillé", en: "Sunny", cs: "Slunečno" }, emoji: "☀️", clothes: "👕" },
            { type: { fr: "Pluvieux", en: "Rainy", cs: "Deštivo" }, emoji: "🌧️", clothes: "🧥" }
          ]
        },
        estimatedTime: 20
      },
      {
        id: 'activity-4',
        title: 'Art Créatif',
        description: 'Exprime ta créativité avec les couleurs',
        ageGroup: '6-8',
        subject: 'art',
        difficulty: 'medium',
        type: 'creative',
        content: {
          colors: {
            primary: [
              { name: { fr: "Rouge", en: "Red", cs: "Červená" }, hex: "#FF0000" },
              { name: { fr: "Bleu", en: "Blue", cs: "Modrá" }, hex: "#0000FF" }
            ]
          }
        },
        estimatedTime: 25
      }
    ];

    this.writeJsonFile(this.activitiesFile, sampleActivities);
  }

  private readJsonFile(filePath: string): any[] {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  private writeJsonFile(filePath: string, data: any[]): void {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }

  // User management methods
  async createUserProfile(profileData: Omit<UserProfile, 'id' | 'createdAt'>): Promise<UserProfile> {
    const id = `user-${Date.now()}`;
    const createdAt = new Date().toISOString();
    const newUser: UserProfile = { id, ...profileData, createdAt, voicePreferences: profileData.voicePreferences || { enabled: true } };

    if (this.pgEnabled) {
      const pool = getPgPool();
      if (pool) {
        await pool.query(
          `INSERT INTO users (id,name,age,avatar,created_at,time_limit,allowed_subjects,difficulty,voice_enabled,voice_id)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
          [id, profileData.name, profileData.age, profileData.avatar, createdAt, profileData.parentalControls.timeLimit || null,
            profileData.parentalControls.allowedSubjects, profileData.parentalControls.difficultyLevel,
            newUser.voicePreferences?.enabled ?? true, newUser.voicePreferences?.voiceId || null]
        );
        return newUser;
      }
    }
    const users = this.readJsonFile(this.usersFile);
    users.push(newUser);
    this.writeJsonFile(this.usersFile, users);
    return newUser;
  }

  async getUserProfiles(): Promise<UserProfile[]> {
    if (this.pgEnabled) {
      const pool = getPgPool();
      if (pool) {
  const res = await pool.query(`SELECT * FROM users ORDER BY created_at ASC`);
  return res.rows.map((r: any) => ({
          id: r.id,
          name: r.name,
            age: r.age,
            avatar: r.avatar,
            createdAt: r.created_at.toISOString(),
            parentalControls: {
              timeLimit: r.time_limit || undefined,
              allowedSubjects: r.allowed_subjects,
              difficultyLevel: r.difficulty
            },
            voicePreferences: {
              enabled: r.voice_enabled,
              voiceId: r.voice_id || undefined
            }
        }));
      }
    }
    return this.readJsonFile(this.usersFile);
  }

  async updateUserProgress(userId: string, progressData: Partial<UserProgress>): Promise<void> {
    if (this.pgEnabled) {
      const pool = getPgPool();
      if (pool) {
        await pool.query(`INSERT INTO progress (user_id,subject,level,score,time_spent,completed_activities,achievements,updated_at)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
            ON CONFLICT (user_id,subject) DO UPDATE SET level=EXCLUDED.level, score=EXCLUDED.score, time_spent=EXCLUDED.time_spent,
              completed_activities=EXCLUDED.completed_activities, achievements=EXCLUDED.achievements, updated_at=EXCLUDED.updated_at`,
          [userId, progressData.subject, progressData.level || 1, progressData.score || 0, progressData.timeSpent || 0,
            progressData.completedActivities || [], progressData.achievements || [], new Date().toISOString()]);
        return;
      }
    }
    const progressList = this.readJsonFile(this.progressFile);
    const existingIndex = progressList.findIndex((p: any) => p.userId === userId && p.subject === progressData.subject);
    const updatedProgress = { userId, subject: progressData.subject, level: progressData.level || 1, score: progressData.score || 0, timeSpent: progressData.timeSpent || 0, completedActivities: progressData.completedActivities || [], achievements: progressData.achievements || [], updatedAt: new Date().toISOString() };
    if (existingIndex >= 0) progressList[existingIndex] = updatedProgress; else progressList.push(updatedProgress);
    this.writeJsonFile(this.progressFile, progressList);
  }

  async getActivities(ageGroup: string, subject?: string): Promise<Activity[]> {
    const activities = this.readJsonFile(this.activitiesFile);
    
    return activities.filter((activity: any) => {
      if (activity.ageGroup !== ageGroup) return false;
      if (subject && activity.subject !== subject) return false;
      return true;
    });
  }

  async saveActivityResult(result: {
    userId: string;
    activityId: string;
    score: number;
    timeTaken: number;
  }): Promise<void> {
    if (this.pgEnabled) {
      const pool = getPgPool();
      if (pool) {
        await pool.query(`INSERT INTO activities_results (user_id,activity_id,score,time_taken) VALUES ($1,$2,$3,$4)`,
          [result.userId, result.activityId, result.score, result.timeTaken]);
        return;
      }
    }
    console.log('Activity result saved (file fallback):', result);
  }

  close(): void {
    // Rien à fermer avec les fichiers JSON
  }


}