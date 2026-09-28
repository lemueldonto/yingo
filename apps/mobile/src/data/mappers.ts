import type { Database } from './database.types';

export type ProfileRow = Database['public']['Tables']['profiles']['Row'];

/** Domain profile: camelCase, dates as UTC Date values. */
export interface Profile {
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export function toProfile(row: ProfileRow): Profile {
  return {
    userId: row.user_id,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}
