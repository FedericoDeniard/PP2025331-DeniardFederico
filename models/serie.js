export class Serie {
  id;
  url;
  name;
  language;
  genres;
  image;

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
    div.classList.add("card");

    const linkElement = document.createElement("a");
    linkElement.href = this.url;
    linkElement.target = "_blank";
    linkElement.classList.add("card__link");

    const idElement = document.createElement("p");
    idElement.textContent = `ID: ${this.id}`;
    idElement.classList.add("card__id");
    linkElement.appendChild(idElement);

    const nameElement = document.createElement("h2");
    nameElement.textContent = this.name;
    nameElement.classList.add("card__name");
    linkElement.appendChild(nameElement);

    const languageElement = document.createElement("p");
    languageElement.textContent = `Language: ${this.language}`;
    languageElement.classList.add("card__language");
    linkElement.appendChild(languageElement);

    const genresElement = document.createElement("p");
    genresElement.textContent = `Genres: ${this.genres.join(", ")}`;
    genresElement.classList.add("card__genres");
    linkElement.appendChild(genresElement);

    const imageElement = document.createElement("img");
    imageElement.src = this.image;
    imageElement.classList.add("card__image");
    linkElement.appendChild(imageElement);

    div.appendChild(linkElement);

    const saveButton = document.createElement("button");
    saveButton.textContent = "Guardar";
    saveButton.classList.add("card__save-button", "button");

    div.appendChild(saveButton);

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
