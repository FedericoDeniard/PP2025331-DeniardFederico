import { databaseController } from "../../controllers/database.js";
import { Serie } from "../serie.js";

export class Model {
  series = [];
  page = 1;
  lastShowIndex = 0;
  firstLoad = true;
  paginationNumber = 240;
  databaseController = databaseController;

  constructor() {}

  async getSeries(page) {
    if (this.series.length >= page * this.paginationNumber) {
      return this.series.slice(
        (page - 1) * this.paginationNumber,
        page * this.paginationNumber
      );
    }

    const newSeries = await this.databaseController.getSeries(page);
    this.series = this.series.concat(newSeries);
    return newSeries;
  }

  async nextPage() {
    let lastShowIndex = this.lastShowIndex;
    const newPage = Math.ceil((lastShowIndex + 1) / this.paginationNumber);
    const localIndex = lastShowIndex % this.paginationNumber;

    const newSeries = await this.getSeries(newPage);
    let newPageSeries = newSeries.slice(localIndex, localIndex + 6);

    if (newPageSeries.length < 6) {
      const nextPageSeries = await this.getSeries(newPage + 1);
      const remaining = 6 - newPageSeries.length;
      newPageSeries = newPageSeries.concat(nextPageSeries.slice(0, remaining));
    }

    this.lastShowIndex = lastShowIndex + 6;
    let instancedSeries = newPageSeries.map((s) =>
      Serie.fromJsonString(JSON.stringify(s))
    );

    return instancedSeries;
  }

  async prevPage() {
    let newIndex = this.lastShowIndex - 12;
    if (newIndex < 0) newIndex = 0;

    const newPage = Math.floor(newIndex / this.paginationNumber) + 1;
    const localIndex = newIndex % this.paginationNumber;

    const newSeries = await this.getSeries(newPage);
    let newPageSeries = newSeries.slice(localIndex, localIndex + 6);

    if (newPageSeries.length < 6 && newPage > 1) {
      const prevPageSeries = await this.getSeries(newPage - 1);
      const remaining = 6 - newPageSeries.length;
      newPageSeries = prevPageSeries.slice(-remaining).concat(newPageSeries);
    }

    this.lastShowIndex = newIndex + 6;
    let instancedSeries = newPageSeries.map((s) =>
      Serie.fromJsonString(JSON.stringify(s))
    );

    return instancedSeries;
  }

  async initialLoad() {
    if (this.firstLoad) {
      let newSeries = await this.databaseController.getSeries(this.page);

      this.series = newSeries;
      this.firstLoad = false;
    }
  }
}

const model = new Model();

// async function loadAndPaginate() {
//   const firstBatch = await model.initialLoad();

//   const nextBatch = await model.nextPage();
//   console.log("Siguientes 6 series:", nextBatch);
//   const nextBatch2 = await model.nextPage();
//   console.log("Siguientes 6 series:", nextBatch2);
//   const prevBatch = await model.prevPage();
//   console.log("Anteriores 6 series:", prevBatch);
// }

// loadAndPaginate();
