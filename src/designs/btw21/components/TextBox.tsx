import AutoScaleText from "../../../components/canvaselements/AutoScaleText";
import React, { ReactElement, useState } from "react";
import DividerH from "../../../components/canvaselements/DividerH";

interface TextBoxProps {
  x: number;
  y: number;
  width: number;
  height: number;
  margin?: number;
  formData: any;
  logoBox?: ReactElement;
  borderMargin?: number;
  color?: string
  shadowEnabled?: boolean
  mainFont?: string
}

const TextBox: React.FC<TextBoxProps> = ({
  x,
  y,
  width,
  height,
  margin = 0,
  formData,
  logoBox,
  borderMargin = 0,
  color = "gray",
  shadowEnabled = false,
  mainFont = "BebasNeue"
}) => {
  const [claimRatio, setClaimRatio] = useState(logoBox ? 0.45 : 0.7);
  const [logoRatio0, setLogoRatio0] = useState(0.3);
  let logoRatio;
    
  if (formData?.claim?.style === "claimtext") {
    logoRatio = logoBox ? logoRatio0 : 0;
  } else {
    logoRatio = logoBox ? (logoBox.props.name ? 0.45 : 0.35) : 0;
  }
  let claim
  let font
  if (formData?.claim?.style === "quote") {
      claim = "»" + (formData?.claim?.text || "") + "«"
      font = "DejaRipItalic"
  } else {
        claim = formData?.claim?.text || ""
        font=mainFont
  }

  const boxHeight = height - 2 * margin;
  const boxWidth = width - 2 * margin;

  let logoBoxElement;
  if (logoBox) {
    logoBoxElement = React.cloneElement(logoBox, {
      height: logoRatio * boxHeight,
      y: y + margin + (1 - logoRatio) * boxHeight,
      x: x + margin,
      width: boxWidth + margin + borderMargin,
      maxLogoWidth: 0.7 * boxWidth + margin,
    });
  }

  const calcNewRatio = (setY: number) => {
    setClaimRatio((setY - y - margin) / boxHeight);
  };
  const calcNewLogoRatio = (setY: number) => {
    setLogoRatio0(1 - (setY - y - margin) / boxHeight);
  };

  if (formData?.claim?.style === "claimtext") {
    return (
      <>
        <AutoScaleText
          text={claim}
          x={x + margin}
          y={y + margin}
          width={boxWidth}
          height={claimRatio * boxHeight * ((font==="PoliticsHead") ? 0.95 : 1)}
          fontFamily={font}
          valign="bottom"
          color={color}
          shadowEnabled={shadowEnabled}
        />
        <AutoScaleText
          text={formData?.claim?.desc || ""}
          x={x + margin}
          y={y + margin + claimRatio * boxHeight}
          width={boxWidth}
          height={(1 - claimRatio - logoRatio) * boxHeight}
          fontFamily="DejaRip"
          color={color}
        />
        {logoBoxElement}
        <DividerH
          x={x}
          width={width}
          y={y + margin + claimRatio * boxHeight}
          minY={y + margin + 0.2 * boxHeight}
          maxY={y + margin + (1 - logoRatio) * boxHeight - margin}
          onDragEnd={calcNewRatio}
          onDragMove={calcNewRatio}
        />
        {logoBoxElement && (
          <DividerH
            x={x}
            width={width}
            y={y + margin + (1 - logoRatio) * boxHeight}
            minY={y + margin + claimRatio * boxHeight + margin}
            maxY={y + margin + 0.9 * boxHeight}
            onDragEnd={calcNewLogoRatio}
            onDragMove={calcNewLogoRatio}
          />
        )}
      </>
    );
  } else {
    return (
      <>
        <AutoScaleText
          text={claim}
          x={x + margin}
          y={y + margin}
          width={boxWidth}
          height={(1-logoRatio)*boxHeight-margin}
          fontFamily={font}
          valign="top"
          color={color}
          shadowEnabled={shadowEnabled}
        />
        {logoBoxElement}
      </>
    );
  }
};
export default TextBox;
