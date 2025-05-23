import { ImagePreviewProps } from "../../components/ImagePreview";
import { Group, Rect } from "react-konva";
import { useState } from "react";
import AutoScaleImage, {
  Styles,
} from "../../components/canvaselements/AutoScaleImage";
import DividerV from "../../components/canvaselements/DividerV";
import DividerH from "../../components/canvaselements/DividerH";
import Overlay from "./components/Overlay";
import "./fonts/PoliticsHead.css";
import "./fonts/DejaRip.css";
import "./style.css"

const Image: React.FC<ImagePreviewProps> = ({
  width,
  height,
  formData,
  logo
}) => {

  const [overlayRatio, setOverlayRatio] = useState(0.5);
  const overlayRatioMin = 0.2;
  const overlayRatioMax = 0.8;

  let lineActive;
  let lineColor;
  let bgColor;
  let claimColor;
  let descColor;
  switch (formData?.style?.style) {
    case "custom":
      lineActive = formData?.style?.lineenabled || false;
      lineColor = formData?.style?.linecolor || "#ff8800";
      bgColor = formData?.style?.background || "white";
      claimColor = formData?.style?.claim || "black";
      descColor = formData?.style?.description || "black";
      break;
    case "white-black-purple":
      lineActive = true;
      lineColor = "#652480";
      bgColor = "white";
      claimColor = "black";
      descColor = "black";
      break;
    case "orange-white-purple":
      lineActive = true;
      lineColor = "#652480";
      bgColor = "#ff8800";
      claimColor = "white";
      descColor = "white";
      break;
    case "purple-white-orange":
      lineActive = true;
      lineColor = "#ff8800";
      bgColor = "#652480";
      claimColor = "white";
      descColor = "white";
      break;
    case "black-white-orange":
      lineActive = true;
      lineColor = "#ff8800";
      bgColor = "black";
      claimColor = "white";
      descColor = "white";
      break;
    case "white-black-orange":
    default:
      lineActive = true;
      lineColor = "#ff8800";
      bgColor = "white";
      claimColor = "black";
      descColor = "black";
  }

  let imagePosition = "none";
  let overlayPosition = "full";
  let overlayTransparency = 0;
  if (formData?.image?.style === "background" && formData?.image?.image) {
    imagePosition = "full";
    overlayPosition = "full";
    overlayTransparency = formData?.image?.transparency / 100 || 0;
  }
  if (formData?.image?.style === "sidebyside" && formData?.image?.image) {
    switch (formData?.image?.position) {
      case "left":
        imagePosition = formData?.image?.transparency === 0 ? "left" : "full";
        overlayPosition = "right";
        break;
      case "top":
        imagePosition = formData?.image?.transparency === 0 ? "top" : "full";
        overlayPosition = "bottom";
        break;
      case "bottom":
        imagePosition = formData?.image?.transparency === 0 ? "bottom" : "full";
        overlayPosition = "top";
        break;
      case "right":
      default:
        imagePosition = formData?.image?.transparency === 0 ? "right" : "full";
        overlayPosition = "left";
    }
    overlayTransparency = formData?.image?.transparency / 100 || 0;
  }

    const overlayFont = (formData?.claim?.font && ["PoliticsHead", "DejaRipItalic"].includes(formData?.claim?.font)) ? formData?.claim?.font : "PoliticsHead"

  let overlayWidth;
  let overlayHeight;
  let overlayX;
  let overlayY;
  switch (overlayPosition) {
    case "right":
      overlayWidth = width * overlayRatio;
      overlayHeight = height;
      overlayX = width - overlayWidth;
      overlayY = 0;
      break;
    case "top":
      overlayWidth = width;
      overlayHeight = height * overlayRatio;
      overlayX = 0;
      overlayY = 0;
      break;
    case "bottom":
      overlayWidth = width;
      overlayHeight = height * overlayRatio;
      overlayX = 0;
      overlayY = height - overlayHeight;
      break;
    case "left":
      overlayWidth = width * overlayRatio;
      overlayHeight = height;
      overlayX = 0;
      overlayY = 0;
      break;
    case "full":
    default:
      overlayWidth = width;
      overlayHeight = height;
      overlayX = 0;
      overlayY = 0;
  }

  let imageWidth;
  let imageHeight;
  let imageX;
  let imageY;
  switch (imagePosition) {
    case "right":
      imageWidth = width * (1 - overlayRatio);
      imageHeight = height;
      imageX = width - imageWidth;
      imageY = 0;
      break;
    case "top":
      imageWidth = width;
      imageHeight = height * (1 - overlayRatio);
      imageX = 0;
      imageY = 0;
      break;
    case "bottom":
      imageWidth = width;
      imageHeight = height * (1 - overlayRatio);
      imageX = 0;
      imageY = height - imageHeight;
      break;
    case "left":
      imageWidth = width * (1 - overlayRatio);
      imageHeight = height;
      imageX = 0;
      imageY = 0;
      break;
    case "full":
    default:
      imageWidth = width;
      imageHeight = height;
      imageX = 0;
      imageY = 0;
  }
  
  return (
    <Group x={0} y={0} width={width} height={height}>
      <Rect x={0} y={0} width={width} height={height} fill="white" />
      {imagePosition !== "none" && (
        <AutoScaleImage
          x={imageX}
          y={imageY}
          width={imageWidth}
          height={imageHeight}
          image={formData.image.image}
          style={Styles.fill}
          draggable
        />
      )}
      <Overlay
        x={overlayX}
        y={overlayY}
        width={overlayWidth}
        height={overlayHeight}
        text={formData?.claim?.text || ""}
        margin={(overlayWidth + overlayHeight) / 40}
        transparency={overlayTransparency}
        desc={
          formData?.description?.enabled && formData?.description?.text
            ? formData?.description?.text
            : undefined
        }
        lineColor={lineActive ? lineColor : undefined}
        bgColor={bgColor}
        claimColor={claimColor}
        descColor={descColor}
        font={overlayFont}
        logo={logo}
        logoColor={claimColor}
      />
      {overlayPosition === "left" && (
        <DividerV
          x={overlayX + overlayWidth}
          y={0}
          minX={width * overlayRatioMin}
          maxX={width * overlayRatioMax}
          height={height}
          onDragEnd={(newX) => {
            setOverlayRatio(newX / width);
          }}
          onDragMove={(newX) => {
            setOverlayRatio(newX / width);
          }}
        />
      )}
      {overlayPosition === "right" && (
        <DividerV
          x={overlayX}
          y={0}
          minX={width - width * overlayRatioMax}
          maxX={width - width * overlayRatioMin}
          height={height}
          onDragEnd={(newX) => {
            setOverlayRatio(1 - newX / width);
          }}
          onDragMove={(newX) => {
            setOverlayRatio(1 - newX / width);
          }}
        />
      )}
      {overlayPosition === "top" && (
        <DividerH
          y={overlayY + overlayHeight}
          x={0}
          minY={height * overlayRatioMin}
          maxY={height * overlayRatioMax}
          width={width}
          onDragEnd={(newY) => {
            setOverlayRatio(newY / height);
          }}
          onDragMove={(newY) => {
            setOverlayRatio(newY / height);
          }}
        />
      )}
      {overlayPosition === "bottom" && (
        <DividerH
          y={overlayY}
          x={0}
          minY={height - height * overlayRatioMax}
          maxY={height - height * overlayRatioMin}
          width={width}
          onDragEnd={(newY) => {
            setOverlayRatio(1 - newY / height);
          }}
          onDragMove={(newY) => {
            setOverlayRatio(1 - newY / height);
          }}
        />
      )}
    </Group>
  );
};
export default Image;
