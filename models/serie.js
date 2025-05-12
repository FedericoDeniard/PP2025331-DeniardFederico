export class Serie {
  id;
  url;
  name;
  language;
  genres;
  image;
  // id: number, url: string, name: string, language: string, genres: string[], image: string
  constructor({ id, url, name, language, genres, image }) {
    this.#validateSerie({ id, url, name, language, genres, image });

    this.id = id;
    this.url = url;
    this.name = name;
    this.language = language;
    this.genres = genres;
    this.image = image;
  }

  #validateSerie({ id, url, name, language, genres, image }) {
    if (!id || typeof id !== "number") throw new Error("id is required");
    if (!url || typeof url !== "string") throw new Error("url is required");
    if (!name || typeof name !== "string") throw new Error("name is required");
    if (!language || typeof language !== "string")
      throw new Error("language is required");
    if (!genres || !Array.isArray(genres))
      throw new Error("genres is required");
    if (!image || typeof image !== "string")
      throw new Error("image is required");
  }

  toJsonString() {
    return JSON.stringify(this);
  }

  createHtmlElement() {
    const div = document.createElement("div");
    div.textContent = this.name;

    return div;
  }

  static fromJsonString(jsonString) {
    const serie = JSON.parse(jsonString);

    return new Serie({
      id: serie.id,
      url: serie.url,
      name: serie.name,
      language: serie.language,
      genres: serie.genres,
      image: serie.image.medium,
    });
  }
}
