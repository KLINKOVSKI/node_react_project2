import { Controller, Get, Path, Query, Route, Security } from 'tsoa';
import { TrackService } from '../services/track.service';
import { Track, SearchParams } from '../types/track';

@Route('tracks')
export class TrackController extends Controller {
  private trackService: TrackService;

  constructor() {
    super();
    this.trackService = new TrackService();
  }

  @Get('/')
  public async search(@Query() params: SearchParams): Promise<Track[]> {
    return this.trackService.search(params);
  }

  @Get('{id}')
  public async getTrack(@Path() id: string): Promise<Track> {
    return this.trackService.getTrack(id);
  }

  @Get('genres')
  public async getGenres(): Promise<string[]> {
    return this.trackService.getGenres();
  }
}