import axios from "axios"
import feed2json from "feed2json"
import cheerio from "cheerio"

const env = import.meta.env

export default class Letterboxd {
  #getMeta = async (url) => {
    const { data } = await axios.get(url)
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

  #dataMapping = async (rssString) => {
    const {
      items: [item],
    } = await new Promise((resolve, reject) => {
      feed2json.fromString(rssString, "", (err, data) => {
        if (err !== null) reject(err)
        else resolve(data)
      })
    })

    const { title: composedTitle, url, content_html: html } = item
    const [year, ...titleArr] = composedTitle.split(", ").reverse()
    const title = titleArr.reverse().join(", ")

    const { tagline, description, genres } = await this.#getMeta(
      url.replace(`/${this.user}/`, "/"),
    )

    const $ = cheerio.load(html)
    const img = $("img").attr("src")

    return {
      title,
      year,
      genres,
      tagline,
      description,
      img,
    }
  }

  #getUrl() {
    return `https://letterboxd.com/${this.user}/rss/`
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
