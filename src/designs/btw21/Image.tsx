import { ImagePreviewProps } from "../../components/ImagePreview";
import { Group, Rect } from "react-konva";
import { useState } from "react";
import TextBox from "./components/TextBox";
import "./fonts/BebasNeue.css";
import "./fonts/DejaRip.css";
import "./fonts/DejaRipItalic.css";
import AutoScaleImage, {
  Styles,
} from "../../components/canvaselements/AutoScaleImage";
import DividerV from "../../components/canvaselements/DividerV";
import DividerH from "../../components/canvaselements/DividerH";
import LogoBox from "./components/LogoBox";

const Image: React.FC<ImagePreviewProps> = ({
  width,
  height,
  formData,
  children,
}) => {
  // RAHMEN
  const borderColor = "#ff8800";
  const borderStrokeWidth = Math.floor((width + height) / 80);
  const margin = borderStrokeWidth;

  const innerX = borderStrokeWidth;
  const innerY = borderStrokeWidth;
  const innerWidth = width - 2 * borderStrokeWidth;
  const innerHeight = height - 2 * borderStrokeWidth;

  const [imageRatio, setImageRatio] = useState(0.4);
  const imageRatioMin = 0.2;
  const imageRatioMax = 0.7;

  const imageSbsActive =
    formData?.image?.style === "sidebyside" && formData?.image?.image;
    const imageBgActive = formData?.image?.style === "background" && formData?.image?.image;
  const imageSbsPosition = formData?.image?.position || "right";

  let imageX;
  let imageY;
  let imageWidth;
  let imageHeight;
  let textBoxX;
  let textBoxY;
  let textBoxWidth;
  let textBoxHeight;
  if (imageSbsActive) {
    switch (imageSbsPosition) {
      case "left":
      case "right":
        imageWidth = innerWidth * imageRatio;
        imageHeight = innerHeight;
        textBoxWidth = innerWidth - imageWidth;
        textBoxHeight = innerHeight;
        break;
      case "top":
      case "bottom":
      default:
        imageWidth = innerWidth;
        imageHeight = innerHeight * imageRatio;
        textBoxWidth = innerWidth;
        textBoxHeight = innerHeight - imageHeight;
    }

    switch (imageSbsPosition) {
      case "top":
      case "left":
        imageX = innerX;
        imageY = innerY;
        textBoxX = innerX + innerWidth - textBoxWidth;
        textBoxY = innerY + innerHeight - textBoxHeight;
        break;
      case "bottom":
      case "right":
      default:
        imageX = innerX + innerWidth - imageWidth;
        imageY = innerY + innerHeight - imageHeight;
        textBoxX = innerX;
        textBoxY = innerY;
    }
  } else if (imageBgActive) {
    imageWidth = innerWidth;
    imageHeight = innerHeight;
    imageX = innerX;
    imageY = innerY;
    textBoxX = innerX;
    textBoxY = innerY;
    textBoxWidth = innerWidth;
    textBoxHeight = innerHeight;
  } else {
    imageWidth = 0;
    imageHeight = 0;
    imageX = 0;
    imageY = 0;
    textBoxX = innerX;
    textBoxY = innerY;
    textBoxWidth = innerWidth;
    textBoxHeight = innerHeight;
  }

  let logoBoxX = 0
  let logoBoxY = 0
  let logoBoxWidth = 0
  let logoBoxHeight = 0
  let maxLogoWidth = 0
  let logoBoxInTextBox = false
  let logoFillBg = false

  if (imageSbsActive && imageSbsPosition === "right" ) {
    logoBoxWidth = 0.95*(borderStrokeWidth+imageWidth)
    maxLogoWidth = Math.min(width*0.45, logoBoxWidth*0.95)
    logoBoxX= width-logoBoxWidth
    logoBoxY = imageY+imageHeight*0.65
    logoBoxHeight = imageY+imageHeight-margin-logoBoxY
  logoFillBg = true
  }
  if (imageSbsActive && imageSbsPosition === "bottom" ) {
    logoBoxWidth = 0.95*(borderStrokeWidth+textBoxWidth)
    maxLogoWidth = Math.min(width*0.65, logoBoxWidth*0.95)
    logoBoxX= width-logoBoxWidth
    logoBoxY = imageY+imageHeight*0.3
    logoBoxHeight = imageY+imageHeight-margin-logoBoxY
    logoFillBg = true
  }
  if (imageSbsActive && imageSbsPosition === "left" ) {
    logoBoxInTextBox = true
    logoBoxWidth = 0.95*(borderStrokeWidth+textBoxWidth)
    maxLogoWidth = Math.min(width*0.45, logoBoxWidth*0.95)
    logoBoxX= width-logoBoxWidth
    logoBoxY = imageY+imageHeight*0.65
    logoBoxHeight = imageY+imageHeight-margin-logoBoxY
  }
  if (imageSbsActive && imageSbsPosition === "top" ) {
    logoBoxInTextBox = true
    logoBoxWidth = 0.95*(borderStrokeWidth+imageWidth)
    maxLogoWidth = Math.min(width*0.7, logoBoxWidth*0.95)
    logoBoxX= width-logoBoxWidth
    logoBoxY = textBoxY+textBoxHeight*0.65
    logoBoxHeight = textBoxY+textBoxHeight-margin-logoBoxY
  }
  if (!imageSbsActive) {
    logoBoxInTextBox = true
    logoBoxWidth = 0.95*(borderStrokeWidth+textBoxWidth)
    maxLogoWidth = Math.min(width*0.45, logoBoxWidth*0.95)
    logoBoxX= width-logoBoxWidth
    logoBoxY = textBoxY+textBoxHeight*0.65
    logoBoxHeight = textBoxY+textBoxHeight-margin-logoBoxY
    if (imageBgActive) {
      logoFillBg = true
    }
  }

  let mainFont = "BebasNeue"
  if ((formData?.claim?.advanced?.font || "") !== "") {
    mainFont = formData?.claim?.advanced?.font
  }

  const LogoBoxIm = (
    <LogoBox
      x={logoBoxX}
      y={logoBoxY}
      width={logoBoxWidth}
      height={logoBoxHeight}
      maxLogoWidth={maxLogoWidth}
      name={formData?.claim?.name || ""}
      nameMargin={borderStrokeWidth + margin}
      fillBg={logoFillBg}
      mainFont={mainFont}
    />
  );

  return (
    <Group x={0} y={0} width={width} height={height}>
      <Rect x={0} y={0} width={width} height={height} fill="white"></Rect>
      <Rect
        x={borderStrokeWidth / 2}
        y={borderStrokeWidth / 2}
        width={width - borderStrokeWidth}
        height={height - borderStrokeWidth}
        stroke={borderColor}
        strokeWidth={borderStrokeWidth}
        fillEnabled={false}
      />
      {(imageSbsActive || imageBgActive) && (
        <AutoScaleImage
          style={Styles.fill}
          x={imageX}
          y={imageY}
          width={imageWidth}
          height={imageHeight}
          image={formData.image.image}
          draggable
        />
      )}
      <TextBox
        x={textBoxX}
        y={textBoxY}
        width={textBoxWidth}
        height={textBoxHeight}
        margin={margin}
        formData={formData}
        logoBox={logoBoxInTextBox ? LogoBoxIm: undefined}
        borderMargin={borderStrokeWidth}
        color={(imageBgActive) ? "white": "#1d1e1c"}
        shadowEnabled={imageBgActive}
        mainFont={mainFont}
      />
      {imageSbsActive && imageSbsPosition === "left" && (
        <DividerV
          x={imageX + imageWidth}
          minX={innerX + imageRatioMin * innerWidth}
          maxX={innerX + imageRatioMax * innerWidth}
          y={innerY}
          height={innerHeight}
          onDragEnd={(newX) => setImageRatio((newX - innerX) / innerWidth)}
        />
      )}
      {imageSbsActive && imageSbsPosition === "right" && (
        <DividerV
          x={imageX}
          minX={innerX + (1 - imageRatioMax) * innerWidth}
          maxX={innerX + (1 - imageRatioMin) * innerWidth}
          y={innerY}
          height={innerHeight}
          onDragEnd={(newX) => setImageRatio(1 - (newX - innerX) / innerWidth)}
        />
      )}
      {imageSbsActive && imageSbsPosition === "top" && (
        <DividerH
          y={imageY + imageHeight}
          minY={innerY + imageRatioMin * innerHeight}
          maxY={innerY + imageRatioMax * innerHeight}
          x={innerX}
          width={innerWidth}
          onDragEnd={(newY) => setImageRatio((newY - innerY) / innerHeight)}
        />
      )}
      {imageSbsActive && imageSbsPosition === "bottom" && (
        <DividerH
          y={imageY}
          minY={innerY + (1 - imageRatioMax) * innerHeight}
          maxY={innerY + (1 - imageRatioMin) * innerHeight}
          x={innerY}
          width={innerWidth}
          onDragEnd={(newY) => setImageRatio(1 - (newY - innerY) / innerHeight)}
        />
      )}
      { !logoBoxInTextBox &&
      (<>{LogoBoxIm}</>)
      }
    </Group>
  );
};
export default Image;
