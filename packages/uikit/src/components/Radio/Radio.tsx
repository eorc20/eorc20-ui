import styled from "styled-components";
import { space } from "styled-system";
import { RadioProps, scales } from "@inscription/uikit/src/components/Radio/types";

const getScale = ({ scale }: RadioProps) => {
  switch (scale) {
    case scales.SML:
      return "14px";
    case scales.SM:
      return "18px";
    case scales.MD:
    default:
      return "32px";
  }
};

const getCheckedScale = ({ scale }: RadioProps) => {
  switch (scale) {
    case scales.SML:
      return "6px";
    case scales.SM:
      return "9px";
    case scales.MD:
    default:
      return "20px";
  }
};

const Radio = styled.input.attrs({ type: "radio" })<RadioProps>`
  appearance: none;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  display: inline-block;
  height: ${getScale};
  width: ${getScale};
  vertical-align: middle;
  transition: background-color 0.2s ease-in-out;
  border: 0;
  border-radius: 50%;
  /* background-color: ${({ theme }) => theme.colors.input}; */
  /* box-shadow: ${({ theme }) => theme.shadows.inset}; */
  border: 1px solid #000;

  &:after {
    border-radius: 50%;
    content: "";
    height: ${getCheckedScale};
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: ${getCheckedScale};
  }

  /* &:hover:not(:disabled):not(:checked) {
    box-shadow: ${({ theme }) => theme.shadows.focus};
  } */

  /* &:focus {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focus};
  } */

  &:checked {
    /* border: 1px solid ${({ theme }) => theme.radio.handleBackground}; */
    border: 1px solid #000;
    background-color: ${({ theme }) => theme.colors.invertedContrast};
    &:after {
      background-color: ${({ theme }) => theme.radio.handleBackground};
    }
  }

  &:disabled {
    cursor: default;
    opacity: 0.6;
  }
  ${space}
`;

Radio.defaultProps = {
  scale: scales.MD,
  m: 0,
};

export default Radio;
