import { Controller, Get, Post, Put, Delete, Body, Path, Security, Route } from 'tsoa';
import { PlaylistService } from '../services/playlist.service';
import { Playlist, CreatePlaylistDto, UpdatePlaylistDto } from '../types/playlist';

@Route('playlists')
@Security('jwt')
export class PlaylistController extends Controller {
  private playlistService: PlaylistService;

  constructor() {
    super();
    this.playlistService = new PlaylistService();
  }

  @Get('/')
  public async getUserPlaylists(): Promise<Playlist[]> {
    return this.playlistService.getUserPlaylists();
  }

  @Post('/')
  public async createPlaylist(@Body() data: CreatePlaylistDto): Promise<Playlist> {
    return this.playlistService.createPlaylist(data);
  }

  @Get('{id}')
  public async getPlaylist(@Path() id: string): Promise<Playlist> {
    return this.playlistService.getPlaylist(id);
  }

  @Put('{id}')
  public async updatePlaylist(
    @Path() id: string,
    @Body() data: UpdatePlaylistDto
  ): Promise<Playlist> {
    return this.playlistService.updatePlaylist(id, data);
  }

  @Delete('{id}')
  public async deletePlaylist(@Path() id: string): Promise<void> {
    return this.playlistService.deletePlaylist(id);
  }

  @Post('{id}/tracks/{trackId}')
  public async addTrackToPlaylist(
    @Path() id: string,
    @Path() trackId: string
  ): Promise<Playlist> {
    return this.playlistService.addTrackToPlaylist(id, trackId);
  }

  @Delete('{id}/tracks/{trackId}')
  public async removeTrackFromPlaylist(
    @Path() id: string,
    @Path() trackId: string
  ): Promise<Playlist> {
    return this.playlistService.removeTrackFromPlaylist(id, trackId);
  }
}