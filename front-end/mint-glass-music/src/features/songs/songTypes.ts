export interface Song {
  id: string;
  _id?: string;
  title: string;
  artist: string;
  genre: string;
  album?: string;
  durationSec?: number;
}

export interface SongPayloadNew {
  title: string;
  artist: string;
  genre: string;
  album?: string;
  durationSec?: number;
}
