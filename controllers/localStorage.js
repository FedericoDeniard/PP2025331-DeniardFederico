class LocalStorageController {
  constructor() {
    this.series = this.getSeries() || new Set();
  }

  getSeries() {
    const stored = localStorage.getItem("series");
    const array = stored ? JSON.parse(stored) : [];
    return new Set(array);
  }

  addSerie(id) {
    this.series.add(id);
    this.setSeries(this.series);
  }

  removeSerie(id) {
    this.series.delete(id);
    this.setSeries(this.series);
  }

  setSeries(series) {
    this.series = series;
    const array = Array.from(series);

    localStorage.setItem("series", JSON.stringify(array));
    console.log(this.series);
  }
}

export const localStorageController = new LocalStorageController();
