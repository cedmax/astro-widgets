import axios from "axios"
import cheerio from "cheerio"
import { find, get } from "lodash-es"

const env = import.meta.env

const periods = ["overall", "7day", "1month", "3month", "6month", "12month"]
const periodStrings = [
  "overall",
  "7 days",
  "month",
  "3 months",
  "6 months",
  "12 months",
]
const getCopyString = (entity, period) =>
  `Top ${entity} in the last ${periodStrings[periods.findIndex((t) => t === period)]}`

const methods = ["track", "artist", "album"]
const methodsMap = {
  track: "user.getTopTracks",
  artist: "user.getTopArtists",
  album: "user.getTopAlbums",
}

const validate = (key, allowed, value) => {
  if (!allowed.includes(value)) {
    throw new Error(
      `LASTFM_${key.toUpperCase()} not supported, it should be one of the following ${allowed.join(", ")}`,
    )
  }
  return value
}

export default class LastFm {
  #dataMapping = {
    track: async (data) => ({
      title: get(data, "toptracks.track.0.name"),
      subtitle: get(data, "toptracks.track.0.artist.name"),
      playcount: get(data, "toptracks.track.0.playcount"),
      url: get(data, "toptracks.track.0.url"),
      image: await this.#getTrackImage(
        get(data, "toptracks.track.0.artist.name"),
        get(data, "toptracks.track.0.name"),
      ),
    }),
    album: (data) => ({
      title: get(data, "topalbums.album.0.name"),
      subtitle: get(data, "topalbums.album.0.artist.name"),
      playcount: get(data, "topalbums.album.0.playcount"),
      url: get(data, "topalbums.album.0.url"),
      image: find(
        get(data, "topalbums.album.0.image"),
        ({ size }) => size === "large",
      )["#text"],
    }),
    artist: async (data) => ({
      title: get(data, "topartists.artist.0.name"),
      subtitle: get(data, "topartists.artist.0.artist.name"),
      playcount: get(data, "topartists.artist.0.playcount"),
      url: get(data, "topartists.artist.0.url"),
      image: await this.#getArtistImage(get(data, "topartists.artist.0.url")),
    }),
  }

  #getUrl() {
    return `https://ws.audioscrobbler.com/2.0/?api_key=${this.apiKey}&method=${methodsMap[this.entity]}&user=${this.user}&period=${this.period}&limit=1&format=json`
  }

  async #getTrackImage(artist, track) {
    const { data } = await axios.get(
      `https://ws.audioscrobbler.com/2.0/?api_key=${this.apiKey}&method=track.getInfo&artist=${artist}&track=${track}&format=json`,
    )
    return find(get(data, "track.album.image"), ({ size }) => size === "large")[
      "#text"
    ]
  }

  async #getArtistImage(url) {
    const { data } = await axios.get(url)
    const $ = cheerio.load(data)
    return $(".header-new-background-image").attr("content")
  }

  constructor() {
    if (!env.LASTFM_API_KEY || !env.LASTFM_USER) {
      throw new Error("Api key and last.fm user are needed for this widget")
    }

    this.apiKey = env.LASTFM_API_KEY
    this.user = env.LASTFM_USER
    this.entity = validate("method", methods, env.LASTFM_ENTITY || "track")
    this.period = validate("method", periods, env.LASTFM_TIMEFRAME || "7day")
  }

  async fetch() {
    const { data } = await axios.get(this.#getUrl())
    const remapped = await this.#dataMapping[this.entity](data)
    return {
      ...remapped,
      copy: getCopyString(this.entity, this.period),
    }
  }
}
