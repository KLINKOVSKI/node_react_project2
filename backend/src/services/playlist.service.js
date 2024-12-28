"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistService = void 0;
var uuid_1 = require("uuid");
var track_service_1 = require("./track.service");
var errors_1 = require("../utils/errors");
var database_1 = require("../database/database");
var PlaylistService = /** @class */ (function () {
    function PlaylistService() {
        this.db = database_1.default;
        this.trackService = new track_service_1.TrackService();
    }
    PlaylistService.prototype.getUserPlaylists = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.query('SELECT * FROM playlists WHERE owner_id = $1 ORDER BY created_at DESC', [this.getCurrentUserId()])];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.rows];
                }
            });
        });
    };
    PlaylistService.prototype.createPlaylist = function (data, p0) {
        return __awaiter(this, void 0, void 0, function () {
            var id, ownerId, now, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = (0, uuid_1.v4)();
                        ownerId = this.getCurrentUserId();
                        now = new Date();
                        // Validate that name exists
                        if (!data.name) {
                            throw new Error('Playlist name is required.');
                        }
                        return [4 /*yield*/, this.db.query('INSERT INTO playlists (id, name, description, owner_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [id, data.name, data.description || null, ownerId, now, now] // Use `null` if no description is provided
                            )];
                    case 1:
                        result = _a.sent();
                        // Check if the query succeeded
                        if (result.rows.length === 0) {
                            throw new Error('Failed to create playlist.');
                        }
                        // Return the created playlist
                        return [2 /*return*/, result.rows[0]];
                }
            });
        });
    };
    PlaylistService.prototype.getPlaylist = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, playlist, tracks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.query('SELECT * FROM playlists WHERE id = $1', [id])];
                    case 1:
                        result = _a.sent();
                        if (!result.rows.length) {
                            throw new errors_1.NotFoundError('Playlist not found');
                        }
                        playlist = result.rows[0];
                        return [4 /*yield*/, this.getPlaylistTracks(id)];
                    case 2:
                        tracks = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, playlist), { tracks: tracks })];
                }
            });
        });
    };
    PlaylistService.prototype.updatePlaylist = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var playlist, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPlaylist(id)];
                    case 1:
                        playlist = _a.sent();
                        this.validateOwnership(playlist);
                        return [4 /*yield*/, this.db.query('UPDATE playlists SET name = $1, description = $2, updated_at = $3 WHERE id = $4 RETURNING *', [data.name || playlist.name, data.description || playlist.description, new Date(), id])];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.rows[0]];
                }
            });
        });
    };
    PlaylistService.prototype.deletePlaylist = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var playlist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPlaylist(id)];
                    case 1:
                        playlist = _a.sent();
                        this.validateOwnership(playlist);
                        return [4 /*yield*/, this.db.query('DELETE FROM playlists WHERE id = $1', [id])];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PlaylistService.prototype.addTrackToPlaylist = function (playlistId, trackId) {
        return __awaiter(this, void 0, void 0, function () {
            var playlist, track;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPlaylist(playlistId)];
                    case 1:
                        playlist = _a.sent();
                        this.validateOwnership(playlist);
                        return [4 /*yield*/, this.trackService.getTrack(trackId)];
                    case 2:
                        track = _a.sent();
                        return [4 /*yield*/, this.db.query('INSERT INTO playlist_tracks (playlist_id, track_id, added_at, added_by) VALUES ($1, $2, $3, $4)', [playlistId, trackId, new Date(), this.getCurrentUserId()])];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, this.getPlaylist(playlistId)];
                }
            });
        });
    };
    PlaylistService.prototype.removeTrackFromPlaylist = function (playlistId, trackId) {
        return __awaiter(this, void 0, void 0, function () {
            var playlist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPlaylist(playlistId)];
                    case 1:
                        playlist = _a.sent();
                        this.validateOwnership(playlist);
                        return [4 /*yield*/, this.db.query('DELETE FROM playlist_tracks WHERE playlist_id = $1 AND track_id = $2', [playlistId, trackId])];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this.getPlaylist(playlistId)];
                }
            });
        });
    };
    PlaylistService.prototype.getPlaylistTracks = function (playlistId) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.query('SELECT * FROM playlist_tracks WHERE playlist_id = $1 ORDER BY added_at DESC', [playlistId])];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, Promise.all(result.rows.map(function (row) { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _a = [{}];
                                            return [4 /*yield*/, this.trackService.getTrack(row.track_id)];
                                        case 1: return [2 /*return*/, (__assign.apply(void 0, [__assign.apply(void 0, _a.concat([(_b.sent())])), { added_at: row.added_at, added_by: row.added_by }]))];
                                    }
                                });
                            }); }))];
                }
            });
        });
    };
    PlaylistService.prototype.validateOwnership = function (playlist) {
        if (playlist.owner_id !== this.getCurrentUserId()) {
            throw new errors_1.UnauthorizedError('You do not have permission to modify this playlist');
        }
    };
    PlaylistService.prototype.getCurrentUserId = function () {
        // This would normally come from the JWT token in the request
        // For now, we'll return a placeholder
        return 'current-user-id';
    };
    return PlaylistService;
}());
exports.PlaylistService = PlaylistService;
