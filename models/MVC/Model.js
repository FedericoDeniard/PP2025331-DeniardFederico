import { databaseController } from "../../controllers/database.js";
import { Serie } from "../serie.js";

export class Model {
  lastShowIndex = 0;
  firstLoad = true;
  databaseController = databaseController;

  constructor() {}

  async nextPage() {
    const ids = this.generateIds(this.lastShowIndex, 6);
    const rawSeries = await this.databaseController.fetchMultipleSeries(ids);

    this.lastShowIndex += 6;

    return rawSeries.map((s) => Serie.fromJsonString(JSON.stringify(s)));
  }

  async prevPage() {
    this.lastShowIndex = Math.max(this.lastShowIndex - 12, 0);

    const ids = this.generateIds(this.lastShowIndex, 6);
    const rawSeries = await this.databaseController.fetchMultipleSeries(ids);

    this.lastShowIndex += 6;

    return rawSeries.map((s) => Serie.fromJsonString(JSON.stringify(s)));
  }

  async initialLoad() {
    if (this.firstLoad) {
      await this.nextPage();
      this.firstLoad = false;
    }
  }

  async getSeriesById(ids) {
    const rawSeries = await this.databaseController.fetchMultipleSeries(ids);
    return rawSeries.map((s) => Serie.fromJsonString(JSON.stringify(s)));
  }

  generateIds(startIndex, count) {
    return Array.from({ length: count }, (_, i) => startIndex + i + 1);
  }
}
