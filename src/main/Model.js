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
      isTabVisible: true,
      isPolyVisible: false,
      isTabChecked: true,
      isPolyChecked: false,
      isModuleLoaded: false,
      isModelComputed: false,
      MassRadiusData: [],
      selected: "",
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

  handleEpsChange = (event) => {
    this.setState({ centralDensity: event.target.value }, () => {
      this.validateEpsField(event.target.value);
    });
  };
  validateEpsField = (value) => {
    const domainValid = this.state.isPolyChecked
      ? value >= 0.35 && value <= 20.0
      : value >= 0.35 && value <= 20.0;
    this.setState({
      epsValid: this.state.centralDensity !== "" ? domainValid : "false",
    });
  };

  handleKappaChange = (event) => {
    this.setState({ Kappa: event.target.value }, () => {
      this.validateKappaField(event.target.value);
    });
  };

  validateKappaField = (value) => {
    this.setState({
      KappaValid:
        this.state.Kappa !== "" ? value >= 50.0 && value <= 2000 : "false",
    });
  };

  handleGammaChange = (event) => {
    this.setState({ Gamma: event.target.value }, () => {
      this.validateGammaField(event.target.value);
    });
  };

  validateGammaField = (value) => {
    this.setState({
      GammaValid:
        this.state.Gamma !== "" ? value >= 2.0 && value <= 3.0 : "false",
    });
  };

  handleTabVisibility = (event) => {
    this.setState(
      {
        select: event.target.value,
        isTabChecked: true,
        isPolyChecked: false,
        isPolyVisible: false,
        isTabVisible: true,
      },
      () => {}
    );
  };

  handlePolyVisibility = (event) => {
    this.setState(
      {
        select: event.target.value,
        isTabChecked: false,
        isPolyChecked: true,
        isPolyVisible: true,
        isTabVisible: false,
      },
      () => {}
    );
  };

  handleCompute = (event) => {
    event.preventDefault();
    const module = this.state.module;
    const model = this.state.isTabChecked
      ? new module.Model(this.state.equationOfState, this.state.centralDensity)
      : new module.Model(
          this.state.Kappa,
          this.state.Gamma,
          this.state.centralDensity
        );

    const massVector = model.returnMassProfile();
    const radiusVector = model.returnRadiusProfile();
    const metricVector = model.returnMetricProfile();
    const densityVector = model.returnDensityProfile();
    const pressureVector = model.returnPressureProfile();

    const mass = model.mass;
    const radius = model.radius;
    const G = 6.6732e-8;
    const MSUN = 1.989e33;
    const C = 2.9979e10;
    const Length = (G * MSUN) / Math.pow(C, 2);

    const solutionData = [];
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
    const MassRadiusData = [];
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
  onMouseEnterKappa = (e) => {
    this.setState({ hoveredKappa: true });
  };
  onMouseLeaveKappa = (e) => {
    this.setState({ hoveredKappa: false });
  };
  onMouseEnterGamma = (e) => {
    this.setState({ hoveredGamma: true });
  };
  onMouseLeaveGamma = (e) => {
    this.setState({ hoveredGamma: false });
  };

  onFocusKappa = (e) => {
    this.setState({ focusedKappa: true });
  };
  onFocusOutKappa = (e) => {
    this.setState({ focusedKappa: false });
  };

  onFocusGamma = (e) => {
    this.setState({ focusedGamma: true });
  };
  onFocusOutGamma = (e) => {
    this.setState({ focusedGamma: false });
  };
  componentDidMount() {
    this.loadModule();
  }

  render() {
    // const epsMsg = this.state.isPolyChecked
    //   ? "value must be between 0.35 and 20.0"
    //   : "value must be between 0.5 and 10.0";
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
              onChange={(event) => this.handleTabVisibility(event)}
            />
            <label className="tab" htmlFor="radioTab">
              Tabulated
            </label>

            <input
              type="radio"
              id="radioPoly"
              name="radioEos"
              value="Polytropic"
              onChange={(event) => this.handlePolyVisibility(event)}
            />

            <label className="poly" htmlFor="radioPoly">
              Polytrope
            </label>
          </div>
          <StyledForm onSubmit={this.handleCompute}>
            <label className="labelEos">Equation Of State : </label>
            {this.state.isTabVisible && (
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
            {this.state.isPolyVisible && (
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
                  onMouseEnter={this.onMouseEnterKappa}
                  onMouseLeave={this.onMouseLeaveKappa}
                  onFocus={this.onFocusKappa}
                  onBlur={this.onFocusOutKappa}
                  float={"left"}
                  inputValid={this.state.KappaValid}
                  value={this.state.Kappa}
                  name="Kappa"
                  type="number"
                  autoComplete="off"
                  onChange={(event) => this.handleKappaChange(event)}
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
                  onMouseEnter={this.onMouseEnterGamma}
                  onMouseLeave={this.onMouseLeaveGamma}
                  onFocus={this.onFocusGamma}
                  onBlur={this.onFocusOutGamma}
                  focused={this.state.focusedGamma}
                  float={"left"}
                  value={this.state.Gamma}
                  name="Gamma"
                  type="number"
                  autoComplete="off"
                  onChange={(event) => this.handleGammaChange(event)}
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
              onChange={(event) => this.handleEpsChange(event)}
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
