import axios, { AxiosResponse } from "axios";

const getToken = () => {
  if (process.browser) {
    return localStorage.getItem("access_token");
  }
};

const getAuthorizationHeader = () => {
  return `Bearer ${getToken()}`;
};

const API = axios.create({
  baseURL: "https://api.spotify.com/v1/",
  headers: {
    Authorization: getAuthorizationHeader()!,
  },
  params: {
    market: "us",
    limit: "10",
  },
});

export const search = {
  // 가수 이름으로 가수 찾기
  getArtists: (type: string, name: string) =>
    API.get(
      `search?${new URLSearchParams({ type: "artist", q: `artist:${name}` })}`
    ),
  // 가수 이름으로 앨범 찾기
  getAlbumsByArtist: (type: string, name: string) =>
    API.get(
      `search?${new URLSearchParams({ type: "album", q: `artist:${name}` })}`
    ),
  // 가수 이름으로 노래 찾기
  getTracksByArtist: (type: string, name: string) =>
    API.get(
      `search?${new URLSearchParams({ type: "track", q: `artist:${name}` })}`
    ),
  // 노래 이름으로 노래 찾기
  getTracks: (type: string, name: string) =>
    API.get(
      `search?${new URLSearchParams({ type: "track", q: `track:${name}` })}`
    ),
  // 앨범 이름으로 앨범 찾기
  getAlbums: (type: string, name: string) =>
    API.get(
      `search?${new URLSearchParams({ type: "album", q: `album:${name}` })}`
    ),
  // 앨범 이름으로 노래 찾기
  getTracksByAlbum: (type: string, name: string) =>
    API.get(
      `search?${new URLSearchParams({ type: "track", q: `album:${name}` })}`
    ),
  // 장르 명으로 가수 찾기
  getArtistsByGenre: (type: string, genre: string) =>
    API.get(
      `search?${new URLSearchParams({ type: "artist", q: `genre:${genre}` })}`
    ),
  // 장르 명으로 노래 찾기
  getTracksByGenre: (type: string, genre: string) =>
    API.get(
      `search?${new URLSearchParams({ type: "track", q: `genre:${genre}` })}`
    ),
  // 최근 2주 안에 발매된 앨범
  getNewAlbums: () =>
    API.get(`search?${new URLSearchParams({ type: "album", q: `tag:new` })}`),
  // 리스너가 하위 10%인 앨범
  getHipsterAlbums: () =>
    API.get(
      `search?${new URLSearchParams({ type: "album", q: `tag:hipster` })}`
    ),
};

export const playlist = {
  getHitPlaylist: (): Promise<AxiosResponse<ITrack>> =>
    API.get(`playlists/37i9dQZF1DXcBWIGoYBM5M`),
};

export interface ITrack {
  tracks: {
    items: [
      {
        track: {
          album: {
            album_type: string;
            artists: [
              {
                name: string;
              }
            ];
            images: [{ height: number; url: string; width: number }];
            name: string;
            release_date: string;
          };
          artists: [{ name: string }];
          href: string;
          id: string;
          name: string;
          preview_url: string;
          uri: string;
        };
      }
    ];
  };
}
