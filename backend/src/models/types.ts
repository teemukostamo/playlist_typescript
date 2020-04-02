export interface Album {
  id: number;
  artist_id: number;
  name: string;
  local?: number;
  identifier?: string;
  label?: string;
  year?: Date;
  spotify_id?: string;
  user_id?: number;
  created_at?: Date;
  updated_at?: Date;
}
