export class View {
  constructor() {
    this.header = this.$("header");
    console.log(this.header);
    this.panelIzquierda = this.$("panel-izquierda");
    console.log(this.panelIzquierda);
    this.principal = this.$("principal");
    console.log(this.principal);

    this.nextButton = this.$("siguiente");
    this.prevButton = this.$("anterior");

    this.loader = {
      loader: this.$("general-loader"),
    };
  }

  $(id) {
    return document.getElementById(id);
  }

  fillPrincipal(elements) {
    const seriesContainer = this.$("series");
    seriesContainer.innerHTML = "";
    elements.forEach((element) => {
      seriesContainer.appendChild(element);
    });
  }

  setGeneralLoader = () => {
    this.loader.loader.style.display = "flex";
  };

  removeGeneralLoader = () => {
    this.loader.loader.style.display = "none";
  };
}
