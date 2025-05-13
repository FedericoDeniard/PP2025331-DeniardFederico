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

  async fetchSeriesById(id) {
    try {
      const response = await fetch(`${this.url}/${id}`);
      if (!response.ok) throw new Error(`ID ${id} no encontrado`);
      return await response.json();
    } catch (error) {
      console.warn(error.message);
      return null;
    }
  }
  async fetchMultipleSeries(ids) {
    const promises = ids.map((id) => this.fetchSeriesById(id));

    const results = await Promise.allSettled(promises);

    const validSeries = results
      .filter((result) => result.status === "fulfilled" && result.value)
      .map((result) => result.value);

    return validSeries;
  }
}

export const databaseController = new DatabaseController();
