/*
 * Artist Model
 *
 * Represents an artist in the music streaming application.
 * Inherits basic account information and includes properties for their songs and albums.
 */
import { Song } from './song.model';
import { Album } from './album.model';

export class Artist {
  constructor(
    public name: string, // Artist's first name
    public surname: string, // Artist's last name
    public username: string, // Unique username for the artist
    public email: string, // Artist's email address
    public dateOfBirth: Date, // Artist's date of birth
    public songs: Song[], // List of songs created by the artist
    public albums: Album[] // List of albums created by the artist
  ) {}
}
