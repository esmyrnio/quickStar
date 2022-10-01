import createModule from "../es6/tov.mjs";
import React from "react";
import Select from "react-select";
import { tabulatedOptions } from "../tabulated/tabulatedOptions.js";
import MassRadius from "./MassRadius.js";
import {
  selectStyles,
  StyledForm,
  StyledFormWrapper,
  StyledButtonWrapper,
  StyledButton,
  StyledInput,
  StyledPolyInputWrapper,
  StyledPolyInputFieldSetKappa,
  StyledPolyInputLegendKappa,
  StyledPolyInputKappa,
  StyledPolyInputFieldSetGamma,
  StyledPolyInputLegendGamma,
  StyledPolyInputGamma,
} from "../styles/Styles.js";
import TabComponent from "./TabComponent.js";

class Model extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      module: undefined,
      centralDensity: "",
      equationOfState: "",
      equationOfStateLabel: "",
      Kappa: "",
      Gamma: "",
      equationOfStateOptions: [],
      hoveredKappa: false,
      focusedKappa: false,
      hoveredGamma: false,
      focusedGamma: false,
      epsValid: true,
      KappaValid: true,
      GammaValid: true,
      isTabChecked: true,
      isPolyChecked: false,
      isModuleLoaded: false,
      isModelComputed: false,
      MassRadiusData: [],
      mass: "-",
      radius: "-",
      massProfile: [],
      radiusProfile: [],
      metricProfile: [],
      densityProfile: [],
      pressureProfile: [],
      solutionData: {},
    };
  }
  // Load ES6 module
  async loadModule() {
    const module = await createModule();
    this.setState({ module: module, isModuleLoaded: true });
  }
  handleEosChange = (event) => {
    this.setState(
      { equationOfState: event.value, equationOfStateLabel: event.label },
      () => {}
    );
  };
  handleInputChange = (event, value) => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.validateField(event.target.name, event.target.value);
    });
  };
  validateField = (name, value) => {
    var domainValid, validateInput, stateValue;
    switch (name) {
      case "centralDensity":
        domainValid = value >= 0.35 && value <= 20.0;
        validateInput = "epsValid";
        stateValue = this.state.centralDensity;
        break;
      case "Kappa":
        domainValid = value >= 50.0 && value <= 2000;
        validateInput = "KappaValid";
        stateValue = this.state.Kappa;
        break;
      case "Gamma":
        domainValid = value >= 2.0 && value <= 3.0;
        validateInput = "GammaValid";
        stateValue = this.state.Gamma;
        break;
      default:
        break;
    }
    this.setState({
      [validateInput]: stateValue !== "" ? domainValid : "false",
    });
  };
  triggerVisibility = (type) => {
    switch (type) {
      case "poly":
        this.setState({
          isTabChecked: false,
          isPolyChecked: true,
        });
        break;
      case "tab":
        this.setState({
          isTabChecked: true,
          isPolyChecked: false,
        });
        break;
      default:
        break;
    }
  };
  /* 
  main routine, which calls the Model costructor depending on which equation of state type is chose,
  Computes the star's gravitational mass, radius, solution profile, as well as a sequence of star models for the given EoS. 
  */
  handleCompute = (event) => {
    event.preventDefault();
    const module = this.state.module;
    // The TOV solver is invoked inside the Model constructor.
    const model = this.state.isTabChecked
      ? new module.Model(this.state.equationOfState, this.state.centralDensity)
      : new module.Model(
          this.state.Kappa,
          this.state.Gamma,
          this.state.centralDensity
        );
    // Store the solution vectors.
    const massVector = model.returnMassProfile();
    const radiusVector = model.returnRadiusProfile();
    const metricVector = model.returnMetricProfile();
    const densityVector = model.returnDensityProfile();
    const pressureVector = model.returnPressureProfile();
    const mass = model.mass;
    const radius = model.radius;
    const G = 6.6732e-8; // Newton's Gravitational Constant in CGS units.
    const MSUN = 1.989e33; // Sun's gravitational mass in CGS units.
    const C = 2.9979e10; // Speed of light in CGS units.
    const Length = (G * MSUN) / Math.pow(C, 2); // Lenth unit in CGS units.
    const solutionData = []; // this will be the solution array which will be passed to child components.
    for (let i = 0; i < massVector.size(); i++) {
      let solution = {};
      if (i % 100 === 0 || i === massVector.size() - 1) {
        solution["radius"] = (radiusVector.get(i) * Length) / Math.pow(10, 5);
        solution["mass"] = massVector.get(i);
        solution["metric"] = metricVector.get(i);
        solution["density"] = densityVector.get(i) * Math.pow(10, 2);
        solution["pressure"] = pressureVector.get(i) * Math.pow(10, 3);
        solutionData.push(solution);
      }
    }
    const MassRadiusData = []; // here we store the sequence of star models to be computed for the Mass & Radius plot.
    let logspace = require("logspace");
    let centralDensities = logspace(Math.log10(0.35), Math.log10(20.0), 50);
    for (let i = 0; i < centralDensities.length; i++) {
      const modelMR = this.state.isTabChecked
        ? new module.Model(this.state.equationOfState, centralDensities[i])
        : new module.Model(
            this.state.Kappa,
            this.state.Gamma,
            centralDensities[i]
          );
      let MassRadiusSolution = {};
      MassRadiusSolution["mass"] = modelMR.mass;
      MassRadiusSolution["radius"] = modelMR.radius;
      MassRadiusSolution["density"] = centralDensities[i];
      MassRadiusData.push(MassRadiusSolution);
    }
    let MassRadiusSolution = {};
    MassRadiusSolution["modelMass"] = model.mass;
    MassRadiusSolution["modelRadius"] = model.radius;
    MassRadiusSolution["modelDensity"] = this.state.centralDensity;
    MassRadiusData.push(MassRadiusSolution);
    this.setState({
      mass: mass,
      radius: radius,
      solutionData: solutionData,
      isModelComputed: true,
      MassRadiusData: MassRadiusData,
    });
  };
  onMouseEnter = (hovered) => {
    this.setState({ [hovered]: true });
  };
  onMouseLeave = (hovered) => {
    this.setState({ [hovered]: false });
  };
  onFocus = (focused) => {
    this.setState({ [focused]: true });
  };
  onFocusOut = (focused) => {
    this.setState({ [focused]: false });
  };
  // loads ES6 module immediately after Model is mounted
  componentDidMount() {
    this.loadModule();
  }
  render() {
    return (
      <>
        <StyledFormWrapper>
          <div className="radio-toolbar">
            <input
              type="radio"
              id="radioTab"
              name="radioEos"
              value="Tabulated"
              checked={this.state.isTabChecked}
              onChange={() => this.triggerVisibility("tab")}
            />
            <label className="tab" htmlFor="radioTab">
              Tabulated
            </label>
            <input
              type="radio"
              id="radioPoly"
              name="radioEos"
              value="Polytropic"
              onChange={() => this.triggerVisibility("poly")}
            />
            <label className="poly" htmlFor="radioPoly">
              Polytrope
            </label>
          </div>
          <StyledForm onSubmit={this.handleCompute}>
            <label className="labelEos">Equation Of State : </label>
            {this.state.isTabChecked && (
              <Select
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                }}
                selectProps={{ eos: this.state.equationOfState }}
                placeholder={
                  this.state.equationOfState !== ""
                    ? this.state.equationOfStateLabel
                    : "select EoS..."
                }
                name="equationOfState"
                className="react-select"
                classNamePrefix="react-select"
                options={tabulatedOptions}
                onChange={(event) => this.handleEosChange(event)}
                styles={selectStyles}
                display="none"
              />
            )}
            {this.state.isPolyCheckedble && (
              <StyledPolyInputWrapper>
                <StyledPolyInputFieldSetKappa
                  hovered={this.state.hoveredKappa}
                  float={"left"}
                  inputValid={this.state.KappaValid}
                  focused={this.state.focusedKappa}
                  value={this.state.Kappa}
                  // placeholder="central density in 10^15 x gr/cm^3"
                >
                  <StyledPolyInputLegendKappa>Kappa</StyledPolyInputLegendKappa>
                </StyledPolyInputFieldSetKappa>
                <StyledPolyInputKappa
                  onMouseEnter={() => this.onMouseEnter("hoveredKappa")}
                  onMouseLeave={() => this.onMouseLeave("hoveredKappa")}
                  onFocus={() => this.onFocus("focusedKappa")}
                  onBlur={() => this.onFocusOut("focusedKappa")}
                  float={"left"}
                  inputValid={this.state.KappaValid}
                  value={this.state.Kappa}
                  name="Kappa"
                  type="number"
                  autoComplete="off"
                  onChange={(event) => this.handleInputChange(event)}
                />
                {!this.state.KappaValid && this.state.Kappa !== "" && (
                  <p className="kappaMsg"> range: [50,2000] </p>
                )}
                <StyledPolyInputFieldSetGamma
                  hovered={this.state.hoveredGamma}
                  float={"left"}
                  inputValid={this.state.GammaValid}
                  focused={this.state.focusedGamma}
                  value={this.state.Gamma}
                  // placeholder="central density in 10^15 x gr/cm^3"
                >
                  <StyledPolyInputLegendGamma>Gamma</StyledPolyInputLegendGamma>
                </StyledPolyInputFieldSetGamma>
                <StyledPolyInputGamma
                  onMouseEnter={() => this.onMouseEnter("hoveredGamma")}
                  onMouseLeave={() => this.onMouseLeave("hoveredGamma")}
                  onFocus={() => this.onFocus("focusedGamma")}
                  onBlur={() => this.onFocusOut("focusedGamma")}
                  focused={this.state.focusedGamma}
                  float={"left"}
                  value={this.state.Gamma}
                  name="Gamma"
                  type="number"
                  autoComplete="off"
                  onChange={(event) => this.handleInputChange(event)}
                />
                {!this.state.GammaValid && this.state.Gamma !== "" && (
                  <p className="gammaMsg"> range: [2.0,3.0] </p>
                )}
              </StyledPolyInputWrapper>
            )}

            <label className="labelEps">
              Central Density (10^15 gr/cm^3) :{" "}
            </label>
            <StyledInput
              inputValid={this.state.epsValid}
              // placeholder="central density in 10^15 x gr/cm^3"
              name="centralDensity"
              type="number"
              value={this.state.centralDensity}
              autoComplete="off"
              onChange={(event) => this.handleInputChange(event)}
            />
            {!this.state.epsValid && this.state.centralDensity !== "" && (
              <span className="span-warning">
                {" "}
                value must be between 0.35 and 20.0{" "}
              </span>
            )}
            <StyledButtonWrapper>
              <StyledButton
                type="submit"
                id="submitBtn"
                className="submitBtn"
                disabled={
                  (this.state.isTabChecked &&
                    (this.state.centralDensity.length === 0 ||
                      this.state.equationOfState.length === 0)) ||
                  !this.state.epsValid ||
                  (this.state.isPolyChecked &&
                    (this.state.Gamma.length === 0 ||
                      this.state.Kappa.length === 0 ||
                      this.state.centralDensity.length === 0 ||
                      !this.state.GammaValid ||
                      !this.state.KappaValid))
                }
              >
                {" "}
                Compute
              </StyledButton>
            </StyledButtonWrapper>
          </StyledForm>
        </StyledFormWrapper>
        <MassRadius
          solution={{
            mass: this.state.mass,
            radius: this.state.radius,
          }}
        />
        <TabComponent
          isModelComputed={this.state.isModelComputed}
          solutionData={this.state.solutionData}
          MassRadiusData={this.state.MassRadiusData}
          MassAndRadius={{ mass: this.state.mass, radius: this.state.radius }}
        />
      </>
    );
  }
}
export default Model;
