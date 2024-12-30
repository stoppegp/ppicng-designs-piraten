import { Group, Rect } from "react-konva";
import { useState, useRef } from "react";
import AutoScaleText from "../../../components/canvaselements/AutoScaleText";
import DividerH from "../../../components/canvaselements/DividerH";
import LogoInterface from "../../../components/interfaces/LogoInterface";
import AutoScaleImage, {
  Styles,
} from "../../../components/canvaselements/AutoScaleImage";
import ContrastColor from "contrast-color";
import Konva from "konva"

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
  logo?: LogoInterface;
  logoColor?: string
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
  descColor = "black",
  font = "PoliticsHead",
  logo,
  logoColor
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

  const cc = new ContrastColor({bgColor: logoColor, fgDarkColor: "light", fgLightColor: "dark", threshold: 180})
  const logoVariant = cc.contrastColor()

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


/*   useEffect(() => {
    if (logoGroupRef && logoGroupRef.current) {
      const checkX = logoGroupRef.current.absolutePosition().x+logoGroupRef.current.attrs.width/2
      const checkY = logoGroupRef.current.absolutePosition().y+logoGroupRef.current.attrs.height/2
      const canvas = document.querySelector('canvas') as HTMLCanvasElement;
      const context = canvas.getContext('2d') as CanvasRenderingContext2D
      if (canvas) {
        const pixelData = context.getImageData(checkX, checkY, 1, 1).data
        const hexColor = rgbHex(pixelData[0], pixelData[1], pixelData[2])
        const cc = new ContrastColor({bgColor: "#" + hexColor, fgDarkColor: "dark", fgLightColor: "light", threshold: 180})
        setLogoVariant(cc.contrastColor())
      }
    }
  }, [logoVariant]); */

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
      <Group x={baseX} y={baseY} width={baseWidth} height={baseHeight}>
        <AutoScaleText
          text={text}
          x={0}
          y={0}
          width={baseWidth}
          height={realClaimRatio * baseHeight}
          fontFamily={font}
          valign={(desc) ? "bottom" : "middle"}
          lineHeight={font === "PoliticsHead" ? 0.9 : 1}
          eline={lineColor}
          elineMarginFactor={1}
          color={claimColor}
        />
        {desc && (
          <AutoScaleText
            text={desc}
            x={0}
            y={claimRatio * baseHeight + margin / 2}
            width={baseWidth}
            height={(1 - claimRatio - logoRatio) * baseHeight - margin / 2}
            fontFamily="DejaRip"
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
