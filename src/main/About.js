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
        <Latex className="latex" displayMode={true}>{`
$$ \\frac{dP}{dr} = -\\frac{(\\epsilon+P)(m+4\\pi r^3P)}{r(r-2m)},$$
$$ \\frac{dm}{dr} = 4\\pi r^2 \\epsilon$$
$$ \\frac{d\\nu}{dr} = -\\frac{2}{\\epsilon+P}\\frac{dP}{dr}=\\frac{2(m+4\\pi r^3P)}{r(r-2m)},$$
$$ \\lambda = -\\ln\\left(1-\\frac{2m}{r}\\right),$$`}</Latex>
      </div>
      <p className="pAbout">
        With the equation of state{" "}
        <Latex className="latex">{`$P = P(\\epsilon),$ `}</Latex>
        the TOV system is completed. <br /> <br /> The polytropic equation of
        state is defined as{" "}
        <Latex className="latex" displayMode={true}>
          {`$$P = K\\rho^{\\Gamma},$$`}
        </Latex>
        where for the density holds{" "}
        <Latex
          className="latex"
          displayMode={true}
        >{`$$\\rho = \\epsilon - \\frac{P}{\\Gamma-1}$$`}</Latex>
        <br />
        The central values for the metric function{" "}
        <Latex className="latex">{`$m$`}</Latex> and the pressure{" "}
        <Latex className="latex">{`$P$`}</Latex> are{" "}
        <Latex className="latex">{`$m(r=0)=0$, `}</Latex> and{" "}
        <Latex className="latex">{`$P(r=0) = P_c = P(\\epsilon_c),$ `}</Latex>
        where <Latex className="latex">{`$\\epsilon_c$`}</Latex> is the central
        energy density, while the choice for the metric function{" "}
        <Latex className="latex">{`$\\nu$`}</Latex> is arbitrary as it will be
        shifted according to the Schwarzchild analytic solution in the exterior
        of the star. <br />
        <br />
        <br />
        The TOV solver is implemented in C++, and compiled into WebAssembly
        code, which is then in-lined into a ES6 JavaScript module. More
        information regarding the implementation of the TOV solver in C++, along
        with the App's source code can be found{" "}
        <a className="link-to-app" href="https://github.com/esmyrnio/quickStar">
          {" "}
          here
        </a>
        .
      </p>
    </div>
  );
};

export default About;
