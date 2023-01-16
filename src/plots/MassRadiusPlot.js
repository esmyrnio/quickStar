import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  ReferenceDot,
} from "recharts";

class MassRadiusPlot extends PureComponent {
  CustomizedDot = ({ cx, cy, payload }) => {
    const MassAndRadius = this.props.MassAndRadius;
    if (payload && payload.length) {
      if (payload[0].payload.modelMass === MassAndRadius["mass"]) {
        return (
          <svg
            x={cx - 10}
            y={cy - 10}
            width={20}
            height={20}
            fill="red"
            viewBox="0 0 1024 1024"
          ></svg>
        );
      }
    }
  };
  CustomReferenceDot = (props) => {
    return (
      <circle cx={props.cx} r="20" cy={props.cy} fill="#FF6863">
        <animate
          attributeName="r"
          from="4"
          to="7.5"
          dur="1.5s"
          begin="0s"
          repeatCount="indefinite"
        />
      </circle>
    );
  };
  CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const odot = (
        <span className="plabel">
          {" "}
          M<sub>{"\u2299"}</sub>
        </span>
      );
      return (
        <div className="custom-tooltip-mr">
          <p className="tooltip-label">
            {`Mass : ${payload[0].value.toFixed(4)}`}
            {odot}
          </p>
          <p className="tooltip-label">{`Radius : ${label.toFixed(4)} km`}</p>
          <p className="tooltip-label">
            {`Density : ${payload[0].payload.density.toFixed(
              4
            )} x 10^15 gr/cm^3`}
          </p>
        </div>
      );
    }

    return null;
  };

  render() {
    const MassRadiusData = this.props.MassRadiusData;
    return (
      <LineChart
        width={850}
        height={600}
        data={MassRadiusData}
        margin={{
          top: 100,
          right: 100,
          left: 100,
          bottom: 50,
        }}
      >
        <XAxis
          dataKey="radius"
          label=<Label
            value="Radius"
            fill={"#39a2db"}
            position={"bottom"}
            dy={20}
            fontWeight={"500"}
            fontSize={"25"}
          />
          tick={{ fontSize: 20, fontWeight: 450, fill: "#39a2db" }}
          stroke="#39a2db"
          type="number"
          domain={[
            (dataMin) => (dataMin / 1.1).toFixed(2),
            (dataMax) => dataMax.toFixed(2),
          ]}
        />
        <YAxis
          label=<Label
            value="Mass"
            fill={"#39a2db"}
            position={"middle"}
            dx={-75}
            fontWeight={"500"}
            fontSize={"25"}
          />
          tick={{ fontSize: 20, fontWeight: 450, fill: "#39a2db" }}
          stroke="#39a2db"
          type="number"
          domain={[0, (dataMax) => dataMax.toFixed(2)]}
          tickCount={7}
        />
        <Tooltip
          content={this.CustomTooltip}
          wrapperStyle={{ outline: "none" }}
        />
        <Line
          type="monotone"
          fill="#39a2db"
          dataKey="mass"
          stackOffset="sign"
        />
        <ReferenceDot
          x={this.props.MassAndRadius["radius"]}
          y={this.props.MassAndRadius["mass"]}
          shape={this.CustomReferenceDot}
        />
      </LineChart>
    );
  }
}

export default React.memo(MassRadiusPlot);
