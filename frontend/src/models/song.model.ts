/*
 * Song Model
 *
 * Represents a song in the music streaming application.
 * Includes properties like name, genre, and a file URL pointing to the audio file.
 */
export class Song {
  constructor(
    public name: string, // Name of the song
    public genre: string, // Genre of the song (e.g., Pop, Rock, Jazz)
    public fileUrl: string // URL or file path to the audio file
  ) {}
}
