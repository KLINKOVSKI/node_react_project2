-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  PASSWORD VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Playlists table
CREATE TABLE IF NOT EXISTS playlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  image_url TEXT
);

-- Playlist tracks table
CREATE TABLE IF NOT EXISTS playlist_tracks (
  playlist_id UUID REFERENCES playlists(id) ON DELETE CASCADE,
  track_id VARCHAR(255) NOT NULL,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  added_by UUID REFERENCES users(id) ON DELETE SET NULL,
  position INTEGER NOT NULL,
  PRIMARY KEY (playlist_id, track_id)
);

-- User liked tracks table
CREATE TABLE IF NOT EXISTS user_liked_tracks (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  track_id VARCHAR(255) NOT NULL,
  liked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, track_id)
);

-- User play history table
CREATE TABLE IF NOT EXISTS play_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  track_id VARCHAR(255) NOT NULL,
  played_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  duration_played INTEGER NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_playlists_owner ON playlists(owner_id);
CREATE INDEX IF NOT EXISTS idx_playlist_tracks_playlist ON playlist_tracks(playlist_id);
CREATE INDEX IF NOT EXISTS idx_play_history_user ON play_history(user_id);
CREATE INDEX IF NOT EXISTS idx_play_history_track ON play_history(track_id);