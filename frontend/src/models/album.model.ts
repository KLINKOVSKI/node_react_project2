/*
 * Album Model
 *
 * Represents an album in the music streaming application.
 * Contains a name and a list of songs included in the album.
 */
import { Song } from './song.model';

export class Album {
  constructor(
    public name: string, // Name of the album
    public songs: Song[] // List of songs in the album
  ) {}
}
