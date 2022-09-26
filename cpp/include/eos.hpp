#ifndef EOS_HPP
#define EOS_HPP


#include <iostream>
#include <vector>
#include <string>
#include <fstream>
#include "../boost/math/interpolators/pchip.hpp"
#include "../boost/math/tools/minima.hpp"

class EOS{
    public:
        EOS(std::string); //Tab
        EOS(double,double); //Poly
        EOS();

    public:
        double p_surface;
        double Gamma,Kappa;
        bool isPoly;
        double p_at_e(double);
        double e_at_p(double);
        double p_at_eps_c_poly(double);
    private:
        int i,n_tab;
        double p,rho,h,n0;
        FILE* f_eos;
        std::vector<double> log_e_tab,log_p_tab,log_h_tab,log_n0_tab,log_rho_tab;
        std::pair<double,double> p_c_poly;

};
#endif