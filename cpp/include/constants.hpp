#ifndef CONSTANTS_HPP
#define CONSTANTS_HPP

namespace CGS{
    extern const double G;
    extern const double C;
    extern const double MSUN;
    extern const double Length;
    extern const double Time;
    extern const double Density;
    extern const double MB;
};

namespace UNITS{
    extern const double KAPPA;
    extern const double KSCALE;
};

namespace INTEGRATION{
    extern const double r_max_surface;
    extern const int RDIV;
    extern const double RMIN;
};

namespace SURFACE{
    extern double p_surface;
    extern double e_surface;
    extern const double enthalpy_min;
};

namespace EXECUTION{
    extern char* call_type;
    extern bool CALL_MAIN;
}


#endif