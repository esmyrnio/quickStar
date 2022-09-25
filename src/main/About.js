import Latex from "react-latex";
const About = () => {
  return (
    <div className="about">
      <p className="pNS">quickStar </p>
      <p className="pAbout">
        is a fully interactive, easy-to-use, online tool for constructing
        accurate non-rotating relativistic star models. With a rich collection
        of realistic neutron star equations of state as well as a polytropic
        approximation option, one can effortlessly explore and visualize the
        individual effects of central density and different matter
        configurations, on the internal structure and macroscopic properties of
        a relativistic star. <br />
        <br /> Given the spacetime geometry of a spherically symmetric star in
        equilibrium in Schwarzchild coordinates, which is described by the line
        element
      </p>
      <div className="tov-equations">
        <Latex
          className="latex"
          displayMode={true}
        >{`$$ ds^2 = -e^{\\nu}dt^2 +e^{\\lambda}dr^2 + r^2(d\\theta^2+\\sin^2\\theta d\\phi^2),$$`}</Latex>
      </div>
      <p className="pAbout">
        the Tolman–Oppenheimer–Volkoff (TOV) system in units{" "}
        <Latex className="latex">{`$c = G = 1$`}</Latex>
      </p>{" "}
      <p className="pAbout">is</p>
      <div className="tov-equations">
        <Latex className="latex" displayMode={true}>{`$$P = P(\\epsilon),$$
$$ \\frac{dP}{dr} = -\\frac{(\\epsilon+P)(m+4\\pi r^3P)}{r(r-2m)},$$
$$ \\frac{dm}{dr} = 4\\pi r^2 \\epsilon$$
$$ \\frac{d\\nu}{dr} = -\\frac{2}{\\epsilon+P}\\frac{dP}{dr}=\\frac{2(m+4\\pi r^3P)}{r(r-2m)},$$
$$ \\lambda = -\\ln\\left(1-\\frac{2m}{r}\\right),$$`}</Latex>
      </div>
      <p className="pAbout">
        The TOV solver is implemented in C++, and compiled into WebAssembly
        code, which is then in-lined into a ES6 JavaScript module.
      </p>
    </div>
  );
};

export default About;
