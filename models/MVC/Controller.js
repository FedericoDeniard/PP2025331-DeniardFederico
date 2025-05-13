import { localStorageController } from "../../controllers/localStorage.js";

export class Controller {
  View;
  Model;
  localStorageController = localStorageController;

  constructor(view, model, isSavedView = false) {
    this.View = view;
    this.Model = model;
    this.isSavedView = isSavedView;

    this.buttonListeners();
  }

  async updateTable(isNextPage = false, saved = false) {
    this.View.setGeneralLoader();
    let elements;

    if (saved) {
      const series = Array.from(this.localStorageController.getSeries());
      console.log(series);

      const resolvedSeries = await this.Model.getSeriesById(series);
      elements = resolvedSeries.map((serie) => serie.createHtmlElement(true));
      this.addSaveButtonListeners(elements);
    } else {
      const series = isNextPage
        ? await this.Model.nextPage()
        : await this.Model.prevPage();
      console.log(series);
      elements = series.map((s) => s.createHtmlElement());
      this.addSaveButtonListeners(elements);
    }

    if (elements) {
      this.View.fillPrincipal(elements);
    }
    this.View.removeGeneralLoader();
  }

  async buttonListeners() {
    if (this.View.nextButton && this.View.prevButton) {
      this.View.nextButton.addEventListener("click", async () => {
        this.updateTable(true);
      });

      this.View.prevButton.addEventListener("click", async () => {
        this.updateTable(false);
      });
    } else {
      console.warn("No se encontraron los botones de navegación");
    }
  }

  async addSaveButtonListeners(elements) {
    elements.forEach((element) => {
      const saveButton = element.querySelector(
        ".card__save-button, .card__delete-button"
      );

      if (saveButton) {
        const id = element
          .querySelector(".card__id")
          .textContent.split(":")[1]
          .trim();

        saveButton.addEventListener("click", async (event) => {
          event.preventDefault();

          const isSaved = this.localStorageController.getSeries().has(id);

          if (isSaved) {
            console.log("Eliminando serie con ID:", id);
            this.localStorageController.removeSerie(id);
            if (this.isSavedView) {
              this.updateTable(true, true);
              return;
            }
          } else {
            console.log("Guardando serie con ID:", id);
            this.localStorageController.addSerie(id);
          }
          this.updateSaveButtonState(saveButton, !isSaved);
        });

        const isSaved = this.localStorageController.getSeries().has(id);
        this.updateSaveButtonState(saveButton, isSaved);
      } else {
        console.error("No se encontró el botón 'guardar'");
      }
    });
  }

  updateSaveButtonState(saveButton, isSaved) {
    if (isSaved) {
      saveButton.textContent = "Eliminar";
      saveButton.classList.add("card__delete-button", "--red");
      saveButton.classList.remove("card__save-button");
    } else {
      saveButton.textContent = "Guardar";
      saveButton.classList.add("card__save-button");
      saveButton.classList.remove("card__delete-button", "--red");
    }
  }
}
