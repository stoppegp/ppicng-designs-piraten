import DesignInterface from "../../components/interfaces/DesignInterface";
import schema from "./schema.json";
import schemaUI from "./schemaUI.json";
import Image from "./Image";

const design: DesignInterface = {
  title: "Bundestagswahl 2021",
  menuSchema: schema as Object,
  menuSchemaUI: schemaUI as Object,
  Image: Image,
  fontFamilies: ["BebasNeue", "DejaRip", "DejaRipItalic"]
};
export default design;
