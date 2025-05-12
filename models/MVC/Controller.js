export class Controller {
  View;
  Model;

  constructor(view, model) {
    this.View = view;
    this.Model = model;

    this.buttonListeners();
  }

  // callback: nextPage, prevPage
  async updateTable(isNextPage = false) {
    this.Model.initialLoad();
    const series = isNextPage
      ? await this.Model.nextPage()
      : await this.Model.prevPage();
    console.log(series);
    const elements = series.map((s) => s.createHtmlElement());
    this.View.fillPrincipal(elements);
  }

  async buttonListeners() {
    this.View.nextButton.addEventListener("click", async () => {
      this.updateTable(true);
    });

    this.View.prevButton.addEventListener("click", async () => {
      this.updateTable(false);
    });
  }
}
