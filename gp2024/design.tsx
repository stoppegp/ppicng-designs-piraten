import DesignInterface from "../../components/interfaces/DesignInterface";
import schema from "./schema.json";
import schemaUI from './schemaUI.json'
import Image from "./Image";

const design: DesignInterface = {
  title: "Göppingen 2024",
  menuSchema: schema as Object,
  menuSchemaUI: schemaUI as Object,
  Image: Image,
  fontFamilies: ["PoliticsHead", "DejaRip", "DejaRipItalic", "DejaRipBoldItalic", "DejaRipBold"],
  logoActive: true,
  defaultLogoGroup: "regional",
  defaultLogo: "goeppingen24",
  passwordHash: "20b9552d5fead7d4d1c605dff0cfe51ca836062fa630be91e2ebf68a633831ea7b4a62402e4a7b611a0b40916794d40a689514e750a99b389722c78c43957c4a",
};
export default design;
