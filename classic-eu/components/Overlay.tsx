import { Group, Rect } from "react-konva";
import { useState, useRef } from "react";
import AutoScaleText from "../../../components/canvaselements/AutoScaleText";
import DividerH from "../../../components/canvaselements/DividerH";
import LogoInterface from "../../../components/interfaces/LogoInterface";
import AutoScaleImage, {
  Styles, VAligns,
} from "../../../components/canvaselements/AutoScaleImage";
import ContrastColor from "contrast-color";
import Konva from "konva";

interface OverlayProps {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  desc?: string;
  margin?: number;
  transparency?: number;
  lineColor?: string;
  bgColor?: string;
  claimColor?: string;
  descColor?: string;
  font?: string;
  descFont?: string;
  logo?: LogoInterface;
  logoColor?: string;
  claimBgColor?: string;
  imageBgSrc?: string;
}
const Overlay: React.FC<OverlayProps> = ({
  x,
  y,
  width,
  height,
  text,
  desc,
  margin = 20,
  transparency = 0,
  lineColor,
  bgColor = "white",
  claimColor = "black",
  claimBgColor,
  descColor = "black",
  font = "PoliticsHead",
  descFont = "DejaRip",
  logo,
  logoColor,
  imageBgSrc,
}) => {
  const [claimRatio, setClaimRatio] = useState(0.5);
  const [logoRatio, setLogoRatio] = useState(0.27);

  /*   const [logoVariant, setLogoVariant] = useState(""); */

  const logoGroupRef = useRef<Konva.Group>(null);

  const baseX = x + margin;
  const baseY = y + margin;
  const baseWidth = width - 2 * margin;
  const baseHeight = height - 2 * margin;

  const realClaimRatio = desc ? claimRatio : 1 - logoRatio;

  const cc = new ContrastColor({
    bgColor: logoColor,
    fgDarkColor: "light",
    fgLightColor: "dark",
    threshold: 180,
  });
  const logoVariant = cc.contrastColor();

  const logopath = require.context("../../../logos", true, /\.(jpg|png)$/);
  let logoUrl;
  if (logo && logoVariant !== "") {
    if (logoVariant === "light" && logo.variants?.light) {
      logoUrl = logopath(logo?.variants.light).default;
    } else if (logoVariant === "dark" && logo.variants?.dark) {
      logoUrl = logopath(logo?.variants.dark).default;
    } else {
      logoUrl = logopath(logo?.default).default;
    }
  }

  return (
    <>
      <Rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={bgColor}
        listening={false}
        opacity={1 - (transparency || 0)}
      />
      {imageBgSrc && (
        <AutoScaleImage
          x={x}
          y={y}
          width={width}
          height={height}
          image={imageBgSrc}
          style={Styles.fill}
          draggable
          valign={VAligns.bottom}
        />
      )}
      <Group x={baseX} y={baseY} width={baseWidth} height={baseHeight}>
        <AutoScaleText
          text={text}
          x={0}
          y={0}
          width={baseWidth}
          height={realClaimRatio * baseHeight}
          fontFamily={font}
          valign={desc ? "bottom" : "middle"}
          lineHeight={
            font === "PoliticsHead"
              ? claimBgColor
                ? 1.2
                : 0.95
              : claimBgColor
              ? 1.2
              : 1.0
          }
          color={claimColor}
          bgColor={claimBgColor}
          bgYOffsetFactor={font === "PoliticsHead" ? 0.05 : -0.1}
        />
        {desc && (
          <AutoScaleText
            text={desc}
            x={0}
            y={claimRatio * baseHeight + margin / 2}
            width={baseWidth}
            height={(1 - claimRatio - logoRatio) * baseHeight - margin / 2}
            fontFamily={descFont}
            color={descColor}
          />
        )}
        <Group
          x={0.05 * baseWidth}
          y={baseHeight * (1 - logoRatio) + margin / 2}
          width={0.9 * baseWidth}
          height={logoRatio * baseHeight - margin / 2}
          ref={logoGroupRef}
        >
          {logoUrl && (
            <AutoScaleImage
              image={logoUrl}
              x={0}
              y={0}
              width={0.9 * baseWidth}
              height={logoRatio * baseHeight - margin / 2}
              style={Styles.fit}
            />
          )}
        </Group>
        {desc && (
          <DividerH
            y={claimRatio * baseHeight}
            x={0}
            minY={2 * margin}
            maxY={(1 - logoRatio) * baseHeight - 2 * margin}
            width={baseWidth}
            onDragEnd={(newY) => {
              setClaimRatio(newY / baseHeight);
            }}
            onDragMove={(newY) => {
              setClaimRatio(newY / baseHeight);
            }}
          />
        )}
        <DividerH
          y={(1 - +logoRatio) * baseHeight}
          minY={desc ? claimRatio * baseHeight + 2 * margin : 2 * margin}
          maxY={baseHeight - 2 * margin}
          x={0}
          width={baseWidth}
          onDragEnd={(newY) => {
            setLogoRatio(1 - newY / baseHeight);
          }}
          onDragMove={(newY) => {
            setLogoRatio(1 - newY / baseHeight);
          }}
        />
      </Group>
    </>
  );
};
export default Overlay;
