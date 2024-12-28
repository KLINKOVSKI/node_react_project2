"use strict";
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
exports.TrackService = void 0;
var axios_1 = require("axios");
var config_1 = require("../config");
var errors_1 = require("../utils/errors");
var TrackService = /** @class */ (function () {
    function TrackService() {
        this.baseUrl = config_1.config.api.jamendo.baseUrl;
        this.apiKey = config_1.config.api.jamendo.key;
    }
    TrackService.prototype.search = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/tracks/"), {
                                params: {
                                    client_id: this.apiKey,
                                    format: 'json',
                                    limit: params.limit || 20,
                                    namesearch: params.query || undefined,
                                    tags: params.genre || undefined,
                                    include: 'musicinfo',
                                    audioformat: 'mp32'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data.results.map(this.mapTrackResponse)];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error searching tracks:', error_1);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TrackService.prototype.getTrack = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/tracks/").concat(id), {
                                params: {
                                    client_id: this.apiKey,
                                    format: 'json',
                                    include: 'musicinfo',
                                    audioformat: 'mp32'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.data.results.length) {
                            throw new errors_1.NotFoundError('Track not found');
                        }
                        return [2 /*return*/, this.mapTrackResponse(response.data.results[0])];
                    case 2:
                        error_2 = _a.sent();
                        if (error_2 instanceof errors_1.NotFoundError)
                            throw error_2;
                        console.error('Error fetching track:', error_2);
                        throw new errors_1.NotFoundError('Track not found');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TrackService.prototype.getGenres = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/tags"), {
                                params: {
                                    client_id: this.apiKey,
                                    format: 'json',
                                    type: 'genre'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data.results.map(function (tag) { return tag.name; })];
                    case 2:
                        error_3 = _a.sent();
                        console.error('Error fetching genres:', error_3);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TrackService.prototype.mapTrackResponse = function (track) {
        var _a, _b;
        return {
            id: track.id,
            name: track.name,
            artist_name: track.artist_name,
            album_name: track.album_name,
            duration: track.duration,
            image: track.image || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300',
            audio: track.audio,
            genre: (_a = track.tags) === null || _a === void 0 ? void 0 : _a[0],
            plays: ((_b = track.stats) === null || _b === void 0 ? void 0 : _b.playback_total) || 0
        };
    };
    return TrackService;
}());
exports.TrackService = TrackService;
