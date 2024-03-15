import styled from "styled-components";
import { scales, PublicToggleProps, HandleProps, InputProps, ScaleKeys } from "@inscription/uikit/src/components/InscriptionToggle/types";

const scaleKeyValues = {
  sm: {
    publicSize: "14px", // The size of a public (the handle)
    travelDistance: "14px", // How far publics should travel horizontally
    toggleHeight: "20px", // General Height and
    toggleWidth: "36px", // Width of a toggle box
    publicThickness: "1px", // Bottom shadow of a public
    publicTwoOffset: "0px",
    publicThreeOffset: "-3px", // so public 2 and 3 are shifted a little bit
    butterTop: "3px", // Fine adjustments for butter position
    butterLeft: "10px",
    butterWidth: "6px", // Width and
    butterHeight: "5px", // Height of a butter block on top of publics
    butterThickness: "0.5px", // Shadow on the bottom of the butter block
    butterRadius: "2px", // Rounded corners for the butter
    butterSmearOneTop: "10px", // There is melted butter
    butterSmearOneLeft: "2.5px", // next to the butter block
    butterSmearTwoTop: "11px", // implemented with :before and :after
    butterSmearTwoRight: "2.5px", // these values adjust the position of it
  },
  md: {
    publicSize: "24px",
    travelDistance: "24px",
    toggleHeight: "32px",
    toggleWidth: "56px",
    publicThickness: "1.5px",
    publicTwoOffset: "-1px",
    publicThreeOffset: "-6px",
    butterTop: "5px",
    butterLeft: "13px",
    butterWidth: "10px",
    butterHeight: "8px",
    butterThickness: "0.75px",
    butterRadius: "3px",
    butterSmearOneTop: "15px",
    butterSmearOneLeft: "3.75px",
    butterSmearTwoTop: "16px",
    butterSmearTwoRight: "3.75px",
  },
  lg: {
    publicSize: "31px",
    travelDistance: "31px",
    toggleHeight: "40px",
    toggleWidth: "72px",
    publicThickness: "2px",
    publicTwoOffset: "-3px",
    publicThreeOffset: "-8px",
    butterTop: "3px",
    butterLeft: "16px",
    butterWidth: "12px",
    butterHeight: "11px",
    butterThickness: "1px",
    butterRadius: "4px",
    butterSmearOneTop: "20px",
    butterSmearOneLeft: "5px",
    butterSmearTwoTop: "22px",
    butterSmearTwoRight: "5px",
  },
};

const getScale =
  (property: ScaleKeys) =>
  ({ scale = scales.LG }: PublicToggleProps) => {
    return scaleKeyValues[scale][property];
  };

export const PublicStack = styled.div<HandleProps>`
  position: relative;
  display: inline-block;

  &:label:before {
    content: none;
  }

  .publics {
    position: absolute;
    transition: 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .public {
    background: #e27c31;
    border-radius: 50%;
    width: ${getScale("publicSize")};
    height: ${getScale("publicSize")};
    position: absolute;
    transition: 0.4s ease;
    top: 2px;
    left: 4px;
    box-shadow: 0 ${getScale("publicThickness")} 0 ${getScale("publicThickness")} #fbbe7c;
  }

  .public:nth-child(1) {
    background: ${({ theme }) => theme.publicToggle.handleBackground};
    box-shadow: 0 ${getScale("publicThickness")} 0 ${getScale("publicThickness")}
      ${({ theme }) => theme.publicToggle.handleShadow};
  }

  .public:nth-child(2) {
    left: 0;
    top: ${getScale("publicTwoOffset")};
    transform: scale(0);
    transition: 0.2s ease 0.2s;
  }

  .public:nth-child(3) {
    top: ${getScale("publicThreeOffset")};
    transform: scale(0);
    transition: 0.2s ease 0.2s;
  }

  .public:nth-child(3):before,
  .public:nth-child(3):after {
    content: "";
    position: absolute;
    background: #ef8927;
    border-radius: 20px;
    width: 50%;
    height: 20%;
  }

  .public:nth-child(3):before {
    top: ${getScale("butterSmearOneTop")};
    left: ${getScale("butterSmearOneLeft")};
  }

  .public:nth-child(3):after {
    top: ${getScale("butterSmearTwoTop")};
    right: ${getScale("butterSmearTwoRight")};
  }

  .butter {
    width: ${getScale("butterWidth")};
    height: ${getScale("butterHeight")};
    background: #fbdb60;
    top: ${getScale("butterTop")};
    left: ${getScale("butterLeft")};
    position: absolute;
    border-radius: ${getScale("butterRadius")};
    box-shadow: 0 ${getScale("butterThickness")} 0 ${getScale("butterThickness")} #d67823;
    transform: scale(0);
    transition: 0.2s ease;
  }
`;

export const PublicInput = styled.input<InputProps>`
  height: 40px;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 40px;

  &:focus + label {
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }

  &:checked + label .publics {
    transform: translateX(${getScale("travelDistance")});
  }

  &:checked + label .public:nth-child(1) {
    background: #e27c31;
    box-shadow: 0 ${getScale("publicThickness")} 0 ${getScale("publicThickness")} #fbbe7c;
    transition-delay: 0.2s;
  }

  &:checked + label .public:nth-child(2) {
    transform: scale(1);
    transition-delay: 0.2s;
  }

  &:checked + label .public:nth-child(3) {
    transform: scale(1);
    transition-delay: 0.4s;
  }

  &:checked + label .butter {
    transform: scale(1);
    transition-delay: 0.6s;
  }
`;

export const PublicLabel = styled.label<PublicToggleProps>`
  width: ${getScale("toggleWidth")};
  height: ${getScale("toggleHeight")};
  background: ${({ theme, checked }) => theme.colors[checked ? "success" : "input"]};
  box-shadow: ${({ theme }) => theme.shadows.inset};
  display: inline-block;
  border-radius: 50px;
  position: relative;
  transition: all 0.3s ease;
  transform-origin: 20% center;
  cursor: pointer;
`;
