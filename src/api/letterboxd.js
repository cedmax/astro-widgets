import axios from "axios"
import cheerio from "cheerio"
import { find, get } from "lodash-es"

const env = import.meta.env

export default class Letterboxd {
  #getImgUrl = async (slug) => {
    const { data } = await axios.get(
      `https://letterboxd.com/ajax/poster/film/${slug}/std/230x345/`,
    )
    const $ = cheerio.load(data)
    return $("img").attr("src")
  }

  #getMeta = async (slug) => {
    const { data } = await axios.get(
      `https://letterboxd.com/film/${slug}/genres/`,
    )
    const $ = cheerio.load(data)

    return {
      tagline: $(".tagline").text(),
      description: $('meta[name="description"]').attr("content"),
      genres: $($("#tab-genres .text-sluglist").get(0))
        .find("a")
        .toArray()
        .map((a) => $(a).text()),
    }
  }

  #dataMapping = async (data) => {
    const $ = cheerio.load(data)
    const diary = $($("#diary-table .diary-entry-row").get(0))
    const slug = $(diary.find("[data-film-slug]").get(0)).attr("data-film-slug")

    const [img, { genres, description, tagline }] = await Promise.all([
      this.#getImgUrl(slug),
      this.#getMeta(slug),
    ])

    const title = diary.find(".td-film-details").text()
    const year = diary.find(".td-released").text()

    return {
      title,
      slug,
      year,
      genres,
      tagline,
      description,
      img,
    }
  }

  #getUrl() {
    return `https://letterboxd.com/${this.user}/films/diary/`
  }

  async #getTrackImage(artist, track) {
    const { data } = await axios.get(
      `https://ws.audioscrobbler.com/2.0/?api_key=${this.apiKey}&method=track.getInfo&artist=${artist}&track=${track}&format=json`,
    )
    return find(get(data, "track.album.image"), ({ size }) => size === "large")[
      "#text"
    ]
  }

  constructor() {
    if (!env.LETTERBOXD_USER) {
      throw new Error("Lettedboxed user is needed for this widget")
    }

    this.user = env.LETTERBOXD_USER
  }

  async fetch() {
    const { data } = await axios.get(this.#getUrl())
    const remapped = await this.#dataMapping(data)
    return {
      ...remapped,
      user: this.user,
    }
  }
}
