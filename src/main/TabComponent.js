import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import MassProfile from "../plots/MassProfile.js";
import MetricProfile from "../plots/MetricProfile.js";
import DensityProfile from "../plots/DensityProfile.js";
import PressureProfile from "../plots/PressureProfile.js";
import MassRadiusPlot from "../plots/MassRadiusPlot.js";

class TabComponent extends React.Component {
  render() {
    const solutionData = this.props.solutionData;
    const MassRadiusData = this.props.MassRadiusData;
    const MassAndRadius = this.props.MassAndRadius;
    return (
      <div className="tabDiv">
        <Tabs className="Tabs">
          <TabList>
            <Tab>Solution Profile</Tab>
            <Tab>Mass & Radius Plot</Tab>
          </TabList>
          <TabPanel>
            {this.props.isModelComputed && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  marginTop: "70px",
                }}
              >
                <MassProfile solutionData={solutionData} />
                <MetricProfile solutionData={solutionData} />
                <DensityProfile solutionData={solutionData} />

                <PressureProfile solutionData={solutionData} />
              </div>
            )}
          </TabPanel>

          <TabPanel>
            {this.props.isModelComputed && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <MassRadiusPlot
                  MassRadiusData={MassRadiusData}
                  MassAndRadius={MassAndRadius}
                />
              </div>
            )}
          </TabPanel>
        </Tabs>
        ;
      </div>
    );
  }
}

export default React.memo(TabComponent);
