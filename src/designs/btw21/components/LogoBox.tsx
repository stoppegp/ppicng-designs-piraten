import { Group, Rect, Text } from "react-konva";
import AutoScaleImage, {
  Aligns,
  Styles,
  VAligns,
} from "../../../components/canvaselements/AutoScaleImage";
import logo from "../Piratenlogoblack.png";
import calculateTextWidth from "calculate-text-width";

interface LogoBoxProps {
  x: number;
  y: number;
  width: number;
  height: number;
  maxLogoWidth: number;
  name?: string;
  nameMargin?: number;
  fillBg?: boolean;
  mainFont?: string
}
const LogoBox: React.FC<LogoBoxProps> = ({
  x,
  y,
  width,
  height,
  maxLogoWidth,
  name = "",
  nameMargin = 0,
  fillBg = false,
  mainFont = "BebasNeue"
}) => {
  const logoRatio = 1000 / 292;
  const namePart = name ? 0.4 : 0;

  const maxLogoHeight = height * (1 / (1 + namePart));

  const ratio = maxLogoWidth / maxLogoHeight;

  let logoWidth;
  let logoHeight;
  if (logoRatio > ratio) {
    logoWidth = maxLogoWidth;
    logoHeight = logoWidth / logoRatio;
  } else {
    logoHeight = maxLogoHeight;
    logoWidth = logoHeight * logoRatio;
  }

  const nameHeight = namePart * logoHeight;

  const logoX = width - logoWidth + 1;
  const logoY = height - logoHeight;

  const nameX = 0;
  const nameY = logoY - nameHeight;
  const nameWidth = width - nameMargin;

  let fontSize = nameHeight * 0.95;
  const probeWidth = calculateTextWidth(name, fontSize + "px " + mainFont);
  let realNameWidth = probeWidth;
  if (probeWidth > nameWidth) {
    fontSize *= (nameWidth / probeWidth) * 0.99;
    realNameWidth = nameWidth;
  }
  return (
    <Group x={x} y={y} width={width} height={height}>
      {fillBg && (
        <Rect
          x={width - nameMargin - realNameWidth - fontSize / 6}
          y={nameY + nameHeight / 2 - fontSize * 0.6 + ((mainFont == "PoliticsHead") ? fontSize/8 : 0)}
          width={realNameWidth + nameMargin + fontSize / 6 + 1}
          height={fontSize}
          fill="white"
        />
      )}
      {name !== "" && (
        <Text
          text={name}
          x={nameX}
          y={nameY}
          width={nameWidth}
          height={nameHeight}
          lineHeight={Math.max(nameHeight / fontSize, 0.1)}
          fontFamily={mainFont}
          fontSize={fontSize}
          align="right"
          valign="middle"
        />
      )}
      <AutoScaleImage
        x={logoX}
        y={logoY}
        width={logoWidth}
        height={logoHeight}
        style={Styles.fit}
        align={Aligns.right}
        valign={VAligns.bottom}
        image={logo}
      />
    </Group>
  );
};
export default LogoBox;
