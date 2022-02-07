import { pool } from '../utils/db';
import { ValidationError } from '../utils/error';
import { v4 as uuid } from 'uuid';
import { FieldPacket } from 'mysql2';

type GiftRecordResults = [GiftRecord[], FieldPacket[]];

export class GiftRecord {
  id?: string;
  name: string;
  count: number;
  constructor(obj: GiftRecord) {
    if (!obj.name || obj.name.length < 3 || obj.name.length > 55) {
      throw new ValidationError('Gift name should be min 3 max 55 characters.');
    }
    // console.log(obj.count);
    if (!obj.count || obj.count < 1 || obj.count > 999999) {
      throw new ValidationError('Gifts should be min 1 max 999999.');
    }
    this.id = obj.id;
    this.name = obj.name;
    this.count = obj.count;
  }

  async insert(): Promise<string> {
    if (!this.id) {
      this.id = uuid();
    }
    await pool.execute('INSERT INTO `gifts` VALUES(:id, :name, :count)', {
      id: this.id,
      name: this.name,
      count: this.count,
    });
    return this.id;
  }

  static async listAll(): Promise<GiftRecord[]> {
    const [results] = (await pool.execute(
      'SELECT * FROM `gifts`'
    )) as GiftRecordResults;
    return results.map((obj) => new GiftRecord(obj));
  }
  static async getOne(id: string): Promise<GiftRecord | null> {
    const [results] = (await pool.execute(
      'SELECT * FROM `gifts` WHERE `id` = :id',
      {
        id,
      }
    )) as GiftRecordResults;
    return results.length === 0 ? null : new GiftRecord(results[0]);
  }

  async countGivenGifts(): Promise<number> {
    const [[{ count }]] = (await pool.execute(
      'SELECT COUNT(*) AS `count` FROM `children` WHERE `giftId` = :id',
      {
        id: this.id,
      }
    )) as GiftRecordResults;
    return count;
  }
}
