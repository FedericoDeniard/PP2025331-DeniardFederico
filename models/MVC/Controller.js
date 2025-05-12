export class Controller {
  View;
  Model;

  constructor(view, model) {
    this.View = view;
    this.Model = model;

    this.buttonListeners();
  }

  async updateTable(isNextPage = false) {
    this.Model.initialLoad();
    const series = isNextPage
      ? await this.Model.nextPage()
      : await this.Model.prevPage();
    console.log(series);
    const elements = series.map((s) => s.createHtmlElement());
    this.View.fillPrincipal(elements);
    this.addSaveButtonListeners(elements);
  }

  async buttonListeners() {
    this.View.nextButton.addEventListener("click", async () => {
      this.updateTable(true);
    });

    this.View.prevButton.addEventListener("click", async () => {
      this.updateTable(false);
    });
  }

  async addSaveButtonListeners(elements) {
    elements.forEach((element, index) => {
      const saveButton = element.querySelector(".card__save-button");

      if (saveButton) {
        saveButton.addEventListener("click", async (event) => {
          event.preventDefault();
          const id = element
            .querySelector(".card__id")
            .textContent.split(":")[1]
            .trim();
          console.log("Se clickeó en la serie con ID:", id);
          // Aquí puedes llamar a la función guardarSerie si lo deseas
          // this.Model.guardarSerie(this.Model.series[index]);
        });
      } else {
        console.error("No se encontró el botón 'guardar'");
      }
    });
  }
}
