import { Controller } from "./models/MVC/Controller.js";
import { Model } from "./models/MVC/Model.js";
import { View } from "./models/MVC/View.js";

const MyModel = new Model();
const MyView = new View();
const MyController = new Controller(MyView, MyModel);

MyController.updateTable(true);
