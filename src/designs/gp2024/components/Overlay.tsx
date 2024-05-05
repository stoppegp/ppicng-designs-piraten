import { Group, Rect } from "react-konva";
import { useState, useRef } from "react";
import AutoScaleText from "../../../components/canvaselements/AutoScaleText";
import DividerH from "../../../components/canvaselements/DividerH";
import LogoInterface from "../../../components/interfaces/LogoInterface";
import AutoScaleImage, {
  Styles, VAligns, Aligns,
} from "../../../components/canvaselements/AutoScaleImage";
import ContrastColor from "contrast-color";
import Konva from "konva";
import gpbleibtbunt from "../backgrounds/gpbleibtbunt.png"

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
  imagePersonSrc?: string;
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
  imagePersonSrc,
}) => {
  const [claimRatio, setClaimRatio] = useState(0.5);
  const [logoRatio, setLogoRatio] = useState(0.2);

  /*   const [logoVariant, setLogoVariant] = useState(""); */

  const logoGroupRef = useRef<Konva.Group>(null);

  let personWRatio
  let personWRatio2
  let descFactor
  if (imagePersonSrc) {
    if (imagePersonSrc?.includes("julia")) {
      if (width/height > 1.2) {
        personWRatio = 0.5
        personWRatio2 = 0.6
      } else {
        personWRatio = 0.65
        personWRatio2 = 0.55
      }
      descFactor = 0.25
    } else if (imagePersonSrc?.includes("gruppe")) {
      if (width/height > 1.2) {
        personWRatio = 0.4
        personWRatio2 = 0.6
      } else {
        personWRatio = 0.6
        personWRatio2 = 0.55
      }
      descFactor = 0.1
    } else {
      if (width/height > 1.2) {
        personWRatio = 0.6
        personWRatio2 = 0.6
      } else {
        personWRatio = 0.75
        personWRatio2 = 0.6
      }
      descFactor = 0.1
    }

  } else {
    personWRatio = 1
    personWRatio2 = 1
    descFactor = 0
  }


  const baseWidth = (width - 2 * margin)*personWRatio2;
  const baseHeight = height - 2 * margin;
  const baseX = x + margin + (width - 2 * margin)*(1-personWRatio2)
  const baseY = y + margin;

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

  const claimWidth = baseWidth*0.6
  const claimHeight = claimWidth*0.096


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
          align={Aligns.right}
        />
      )}

      <Group x={baseX} y={baseY} width={baseWidth} height={baseHeight}>
        <AutoScaleImage
          x={0}
          y={0}
          width={baseWidth}
          height={claimHeight}
          image={gpbleibtbunt}
          style={Styles.fit}
          valign={VAligns.bottom}
          align={imagePersonSrc ? Aligns.right: Aligns.left}
        />
        <AutoScaleText
          text={text}
          x={0}
          y={claimHeight*1.2}
          width={baseWidth}
          height={realClaimRatio * baseHeight - claimHeight*1.2}
          fontFamily={font}
          valign={desc ? "top" : "top"}
          lineHeight={
            font === "PoliticsHead"
              ? claimBgColor
                ? 1.2
                : 0.95
              : claimBgColor
              ? 1.2
              : 1.0
          }
          align={imagePersonSrc ? "right" : "left"}
          color={claimColor}
          bgColor={claimBgColor}
          bgYOffsetFactor={font === "PoliticsHead" ? 0.05 : -0.1}
        />
        {desc && (
          <AutoScaleText
            text={desc}
            x={imagePersonSrc ? baseWidth*descFactor : 0}
            y={claimRatio * baseHeight + margin / 2}
            width={imagePersonSrc ? baseWidth*(1-descFactor) : baseWidth}
            height={(1 - claimRatio - logoRatio) * baseHeight - margin / 2}
            fontFamily={descFont}
            color={descColor}
          />
        )}
</Group>
{imagePersonSrc && <AutoScaleImage
          x={0}
          y={0}
          width={width*personWRatio}
          height={height}
          image={imagePersonSrc}
          style={Styles.fill
          }
          valign={VAligns.bottom}
          align={Aligns.right}
        />}
<Group x={baseX} y={baseY} width={baseWidth} height={baseHeight}>
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
              align={imagePersonSrc ? Aligns.right: Aligns.left}
              valign={VAligns.bottom}
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
