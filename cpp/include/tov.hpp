#ifndef TOV_HPP
#define TOV_HPP

#include "eos.hpp"
#include <vector>

using Vector = std::vector<double>;
using Array = double*;
using String = std::string;

class TOV{
    public:
        TOV(String,double);
        TOV(double,double,double);
        Vector linspace(double, double, int);
        Vector gradient(Vector, double);
        void tovEquations(double, Array, Array);
        void integrateTOV();
    private:
        double rtol,atol;
        double eps;
        double eps_c;
        double r,rout,dr;
        double m_c,nu_c,p_c;
        double m_1,nu_1,p_1;
        Vector r_vec;
        Vector y,yout,dnudr;
        int idx,idxlast,neq,istate;
        Vector r_s,m_s,p_s,e_s,rho_s,h_s,dmdr_s;
        double h_at_r(double);
        EOS eos;
    public:
        double mass,radius;
        Vector radiusProfile,massProfile,metricProfile,pressureProfile,densityProfile;
};
#endif