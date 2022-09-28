import React, { PureComponent } from "react";
import { LineChart, Line, XAxis, YAxis, Label, Tooltip } from "recharts";
class PressureProfile extends PureComponent {
  DataFormater = (number) => {
    number = number !== 0 ? number.toFixed(3) : number;
    return number !== 0 ? number.toString() + "e-3" : number.toString();
  };
  CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{`P : ${payload[0].value.toFixed(
            4
          )}e-3`}</p>
          <p className="tooltip-label">{`r : ${label.toFixed(4)} km`}</p>
        </div>
      );
    }

    return null;
  };

  render() {
    const solutionData = this.props.solutionData;
    return (
      <LineChart
        width={550}
        height={350}
        data={solutionData}
        margin={{
          top: 50,
          right: 50,
          left: 100,
          bottom: 50,
        }}
      >
        <XAxis
          dataKey="radius"
          label=<Label
            value="r [km]"
            fill={"#39a2db"}
            position={"bottom"}
            dy={10}
            fontWeight={"500"}
            fontSize={"25"}
          />
          tick={{ fontSize: 20, fontWeight: 450, fill: "#39a2db" }}
          stroke="#39a2db"
          type="number"
          domain={[0, (dataMax) => dataMax.toFixed(3)]}
          tickCount={7}
        />

        <YAxis
          label={
            <Label
              value={"P(r)"}
              fill={"#39a2db"}
              position={"middle"}
              dx={-100}
              fontWeight={"500"}
              fontSize={"25"}
            />
          }
          tickFormatter={this.DataFormater}
          tick={{ fontSize: 20, fontWeight: 450, fill: "#39a2db" }}
          stroke="#39a2db"
          type="number"
          domain={[
            (dataMin) => dataMin.toFixed(3),
            (dataMax) => dataMax.toFixed(3),
          ]}
          tickCount={7}
        />
        <Tooltip
          content={this.CustomTooltip}
          wrapperStyle={{ outline: "none" }}
        />

        <Line type="monotone" fill="#39a2db" dataKey="pressure" />
      </LineChart>
    );
  }
}

export default React.memo(PressureProfile);
