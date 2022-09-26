#include "../include/eos.hpp"
#include "../include/constants.hpp"
#include <boost/bind.hpp>
#include <cmath>
#include <functional>

using namespace SURFACE;
using namespace UNITS;
using namespace CGS;
using boost::math::interpolators::pchip;
using boost::math::tools::brent_find_minima;

EOS::EOS(std::string eos_file):isPoly(false){
  std::string eos;

  eos=EXECUTION::CALL_MAIN?"EoS/":"../EoS/";
  eos+=eos_file;
  
  if((f_eos=fopen(eos.c_str(),"r")) == NULL ) {    
      std::cout<<"cannot open file "<<eos_file<<std::endl; 
      exit(0);
  }
  fscanf(f_eos,"%d\n",&n_tab);
  for(i=1;i<=n_tab;i++) {  
      fscanf(f_eos,"%lf %lf %lf %lf\n",&rho,&p,&h,&n0) ; 
      log_e_tab.push_back(log10(rho/Density));
      log_p_tab.push_back(log10(p/(Density*pow(C,2))));
      log_h_tab.push_back(log10(h/(pow(C,2))));
      log_n0_tab.push_back(log10(n0));
      log_rho_tab.push_back(log10(MB*n0*pow(Length,3)/MSUN));  

    }
  p_surface=pow(10,log_p_tab[0]);
  fclose(f_eos);
}

EOS::EOS(double Kappa, double Gamma):Gamma(Gamma),Kappa(Kappa),isPoly(true),p_surface(0.0)
{}


double EOS::e_at_p(double pp)
{
  if(!isPoly){
    auto spline = pchip<decltype(log_p_tab)>(log_p_tab,log_e_tab);
    double eTab = pp<p_surface? 0 : pow(10.0,spline(log10(pp)));
    return eTab;
  }
  else{
    double ePoly = pow(pp/Kappa,1.0/Gamma) + pp/(Gamma-1);
    return ePoly;
  }
}
double EOS::p_at_eps_c_poly(double eps_c){return eps_c-Kappa*pow(eps_c-eps_c/(Gamma-1.0),Gamma);}

double EOS::p_at_e(double ee)
{
  
  if(!isPoly){
    auto spline = pchip<decltype(log_e_tab)>(log_e_tab,log_p_tab);
    double pTab = pow(10.0,spline(log10(ee)));
    return pTab;
  }
  else{
    double p_c_approx = Kappa*pow(ee,Gamma);
    const int double_bits = std::numeric_limits<double>::digits;
    p_c_poly = brent_find_minima(boost::bind(&EOS::p_at_eps_c_poly,this,_1), 0.5*p_c_approx,10*p_c_approx,double_bits);
    return p_c_poly.first;
  }
}

