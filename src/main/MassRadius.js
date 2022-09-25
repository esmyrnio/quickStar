import React from "react";

class MassRadius extends React.Component {
  render() {
    const mass = this.props.solution.mass;
    const radius = this.props.solution.radius;
    return (
      <div className="solutionContainer">
        <div className="massWrapper">
          <div className="mass">
            {mass !== "-" ? Number(mass).toFixed(6) : ""}
          </div>
          {mass !== "-" && (
            <div className="odot">
              M<sub>{"\u2299"}</sub>
            </div>
          )}
        </div>
        <div className="radiusWrapper">
          <div className="radius">
            {radius !== "-"
              ? radius >= 10.0
                ? Number(radius).toFixed(5)
                : Number(radius).toFixed(6)
              : ""}
          </div>
          {radius !== "-" && <div className="km">km</div>}
        </div>
      </div>
    );
  }
}

export default React.memo(MassRadius);
