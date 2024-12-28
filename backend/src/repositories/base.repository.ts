import { Pool, QueryResult } from 'pg';
import pool from '../database/database';

export abstract class BaseRepository<T> {
  protected db: Pool;
  protected tableName: string;

  constructor(tableName: string) {
    this.db = pool;
    this.tableName = tableName;
  }

  protected async query(text: string, params?: any[]): Promise<QueryResult> {
    const client = await this.db.connect();
    try {
      return await client.query(text, params);
    } finally {
      client.release();
    }
  }

  async findById(id: string): Promise<T | null> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  async findAll(): Promise<T[]> {
    const result = await this.query(`SELECT * FROM ${this.tableName}`);
    return result.rows;
  }

  async create(data: Partial<T>): Promise<T> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
    
    const result = await this.query(
      `INSERT INTO ${this.tableName} (${keys.join(', ')}) 
       VALUES (${placeholders}) 
       RETURNING *`,
      values
    );
    
    return result.rows[0];
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys
      .map((key, i) => `${key} = $${i + 2}`)
      .join(', ');
    
    const result = await this.query(
      `UPDATE ${this.tableName} 
       SET ${setClause} 
       WHERE id = $1 
       RETURNING *`,
      [id, ...values]
    );
    
    return result.rows[0];
  }

  async delete(id: string): Promise<void> {
    await this.query(
      `DELETE FROM ${this.tableName} WHERE id = $1`,
      [id]
    );
  }
}