import { Serie } from "../models/serie.js";

class DatabaseController {
  url = "https://api.tvmaze.com/shows";

  constructor() {}

  // page: number
  async getSeries(page) {
    const response = await fetch(`${this.url}?=${page}`);
    const data = await response.json();
    return data;
  }
}

export const databaseController = new DatabaseController();
// const serie = await databaseController.getSeries(1);

// const instanceSerie = Serie.fromJsonString(JSON.stringify(serie));
// console.log(instanceSerie);
