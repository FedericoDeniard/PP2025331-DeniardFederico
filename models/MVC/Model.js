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
      // opcional, por si querés precargar la primera página
      await this.nextPage();
      this.firstLoad = false;
    }
  }

  generateIds(startIndex, count) {
    // TVMaze tiene IDs secuenciales del 1 al ~30000, pero algunos pueden no existir
    // Podés filtrar o manejar errores desde el controlador
    return Array.from({ length: count }, (_, i) => startIndex + i + 1);
  }
}
