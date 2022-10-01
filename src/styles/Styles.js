import styled, { createGlobalStyle } from "styled-components";
import { css } from "@emotion/react";
export const GlobalStyle = createGlobalStyle`
html {
    height: 100%;
}

body{
    background: linear-gradient(-45deg, #128DC3,#000000);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    height: 100%;
}
`;

export const selectStyles = {
  input: (base, state) => ({
    ...base,

    fontWeight: 900,
    color: "#39a2db",
  }),
  control: (styles) => ({
    position: "absolute",
    display: "block",
    backgroundColor: "#0000",
    fontSize: "16px",
    fontWeight: 900,
    color: "#39a2db",
    textAlign: "center",
    marginTop: "-25px",
    transitionProperty: "margin-top",
    transitionDuration: "2s",
    width: "96.7%",
    height: "30px",
    border: "2px solid #39a2db",
    borderBottomLeftRadius: "2rem",
    borderTopLeftRadius: "2rem",
    borderBottomRightRadius: "2rem",
    borderTopRightRadius: "2rem",
    padding: "4px",

    "&:hover": {
      outline: "none !important",
      border: "4px solid #39a2db",
      padding: "2px",
    },
  }),
  menu: (base) => ({
    ...base,
    position: "absolute",
    marginTop: "40px",
    backgroundColor: "#ADD8E6",
    borderBottomLeftRadius: "2rem",

    borderTopLeftRadius: "2rem",
  }),
  menuList: (base) => ({
    ...base,
    borderBottomLeftRadius: "2rem",
    borderTopLeftRadius: "2rem",

    padding: 0,
    "::-webkit-scrollbar": {
      width: "7px",
      height: "0px",
    },
    "::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#888",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  }),
  placeholder: (defaultStyles, selectProps) => {
    return {
      ...defaultStyles,
      color:
        selectProps.selectProps.selectProps.eos !== "" ? "#39a2db" : "grey",
      fontWeight:
        selectProps.selectProps.selectProps.eos !== "" ? "900" : "700",
    };
  },
  option: (provided, state) => ({
    ...provided,
    textAlign: "center",
    border: "2px solid black",

    color: state.isSelected ? "#8b0000" : "black",
    fontWeight: state.isSelected ? "800" : "500",
    backgroundColor: state.isFocused ? "#39a2db" : "#0000",
  }),
  singleValue: (provided) => ({
    ...provided,
    textAlign: "center",
    color: "#39a2db",
  }),
};

export const StyledFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  margin-top: 40px;
  margin-left: -20px;
`;
export const StyledForm = styled.form`
  width: 70%;
  position: relative;

  max-width: 400px;
  padding: 30px;
  background-color: #0000;
  border-radius: 10px;
  box-sizing: border-box;
`;

export const StyledPolyInputWrapper = styled.div`
  position: absolute;
  z-index: 1;
  margin-top: -25px;
`;

export const StyledPolyInputFieldSetKappa = styled.fieldset`
  position: absolute;
  display: block;

  z-index: 1;
  width: 140px;
  background-color: #0000;
  margin-top: -7.5px;
  border-bottom-left-radius: 2rem;
  border-top-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  border-top-right-radius: 2rem;
  padding: 4px 4px 4px 4px;
  height: 38px;
  border: 2px solid #39a2db;
  float: left;
  ${(props) => (props.float === "left" ? "" : "margin-left:75px")};
  ${(props) =>
    (props.value !== "" && props.focused) || !props.inputValid
      ? props.inputValid
        ? "border: 4px solid #90ee90;padding: 2px;"
        : "border: 4px solid #FF6863;padding: 2px;"
      : props.focused
      ? "border: 4px solid #39a2db;padding: 2px"
      : "border: 2px solid #39a2db;padding: 4px"}
  ${(props) =>
    props.hovered
      ? props.focused || !props.inputValid
        ? ""
        : "outline: none !important;border: 4px solid #39a2db;padding: 2px;"
      : ""}
`;

export const StyledPolyInputLegendKappa = styled.legend`
  top: 10px;
  left: -10px;
  color: #39a2db;
  font-weight: 900;
`;

export const StyledPolyInputKappa = styled.input.attrs({
  type: "text",
})`
  position: absolute;
  display: block;
  font-weight: 900;
  color: #39a2db;
  z-index: 100;
  font-size: 16px;
  margin-top: -7.5px;

  width: 152px;
  height: 30px;
  margin-top: 8px;
  text-align: center;
  background-color: #0000;
  border: 2px solid #39a2db00;
  border-bottom-left-radius: 2rem;
  border-top-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  border-top-right-radius: 2rem;
  box-sizing: border-box;
  ${(props) => (props.float === "left" ? "" : "margin-left:75px")};
  &:hover {
    outline: none !important;
    border: 4px solid #39a2db00;
    padding: 2px;
  }
  &:focus {
    outline: none !important;
    border: 4px solid #39a2db00;
    padding: 2px;
  }
`;

export const StyledPolyInputFieldSetGamma = styled.fieldset`
  position: absolute;
  display: block;

  z-index: 1;
  width: 140px;
  background-color: #0000;
  margin-top: -7.5px;
  margin-left: 188px;
  border-bottom-left-radius: 2rem;
  border-top-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  border-top-right-radius: 2rem;
  padding: 4px 4px 4px 4px;
  height: 38px;
  border: 2px solid #39a2db;
  float: left;
  ${(props) => (props.float === "left" ? "" : "margin-left:75px")};
  ${(props) =>
    (props.value !== "" && props.focused) || !props.inputValid
      ? props.inputValid
        ? "border: 4px solid #90ee90;padding: 2px;"
        : "border: 4px solid #FF6863;padding: 2px;"
      : props.focused
      ? "border: 4px solid #39a2db;padding: 2px"
      : "border: 2px solid #39a2db;padding: 4px"}
  ${(props) =>
    props.hovered
      ? props.focused || !props.inputValid
        ? ""
        : "outline: none !important;border: 4px solid #39a2db;padding: 2px;"
      : ""}
`;

export const StyledPolyInputLegendGamma = styled.legend`
  top: 10px;
  left: -10px;
  color: #39a2db;
  font-weight: 900;
`;

export const StyledPolyInputGamma = styled.input.attrs({
  type: "text",
})`
  position: absolute;
  display: block;
  font-weight: 900;
  color: #39a2db;
  z-index: 100;
  font-size: 16px;
  margin-top: -7.5px;
  margin-left: 188px;

  width: 152px;
  height: 30px;
  margin-top: 8px;
  text-align: center;
  background-color: #0000;
  border: 2px solid #39a2db00;
  border-bottom-left-radius: 2rem;
  border-top-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  border-top-right-radius: 2rem;
  box-sizing: border-box;
  ${(props) => (props.float === "left" ? "" : "margin-left:75px")};
  &:hover {
    outline: none !important;
    border: 4px solid #39a2db00;
    padding: 2px;
  }
  &:focus {
    outline: none !important;
    border: 4px solid #39a2db00;
    padding: 2px;
  }
`;

export const StyledInput = styled.input.attrs({
  type: "text",
})`
  position: relative;

  display: block;
  font-weight: 900;
  color: #39a2db;
  font-size: 16px;
  width: 100%;
  text-align: center;
  background-color: #0000;
  height: 20px;
  border: 2px solid #39a2db;
  margin: 50px 0 0px;
  border-bottom-left-radius: 2rem;
  border-top-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  border-top-right-radius: 2rem;
  padding: 19px;
  box-sizing: border-box;
  ${(props) =>
    props.value !== ""
      ? props.inputValid
        ? ""
        : "border: 4px solid #FF6863;padding: 17px;"
      : ""}

  &:focus {
    outline: none !important;
    ${(props) =>
      props.value !== ""
        ? props.inputValid
          ? "border: 4px solid #90ee90;padding: 17px;"
          : "border: 4px solid #FF6863;padding: 17px;"
        : "border: 4px solid #39a2db;padding:17px"}
  }

  &:hover:not(:focus) {
    outline: none !important;
    border: 4px solid #39a2db;
    padding: 17px 17px 17px 17px;
    ${(props) =>
      props.value !== ""
        ? props.inputValid
          ? ""
          : "border: 4px solid #FF6863;padding: 17px;"
        : ""}
  }
`;
export const StyledButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  box-sizing: border-box;
`;
export const StyledButton = styled.button`
  display: block;
  justify-items: center;
  align-items: center;
  background-color: #0000;
  border-radius: 2rem;
  border: 2.5px solid #39a2db;
  color: #f2f2f2;
  font-size: 0.9rem;
  font-weight: 400;
  border-bottom-left-radius: 2rem;
  border-top-left-radius: 2rem;
  height: 50px;
  margin: 3.5rem auto 1.5rem;
  padding: 0 20px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px #053742;
  transition: 0.05s;

  &:active {
    transform: scale(0.95);
    box-shadow: 3px 2px 22px 1px #053742;
  }
  &:hover {
    background: rgba(50, 224, 195, 0.142);
    border: 4px solid #39a2db;
  }
`;

export const override = css`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
