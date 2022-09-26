#include "../include/constants.hpp"
#include "../include/tov.hpp"
#include "../include/LSODA.hpp"

using boost::math::interpolators::pchip;
using namespace INTEGRATION;

TOV::TOV(String eos_name,double eps_c):eos(eos_name),eps_c(eps_c*pow(10,15)/CGS::Density),neq(3),rtol(1e-06),atol(1e-26)
{}

TOV::TOV(double Kappa, double Gamma, double eps_c):eos(Kappa,Gamma),eps_c(eps_c*pow(10,15)/CGS::Density),neq(3),rtol(1e-12),atol(1e-50)
{}

std::vector<double> TOV::linspace(double start, double end, int num)
{
  std::vector<double> linspaced;
  if (num == 0) { return linspaced; }
  if (num == 1) 
    {
      linspaced.push_back(start);
      return linspaced;
    }
  double delta = (end - start) / (num - 1);
  for(int i=0; i < num-1; ++i)
    {
      linspaced.push_back(start + delta * i);
    }
  linspaced.push_back(end); 
  return linspaced;
}
std::vector<double> TOV::gradient(std::vector<double> input, double h)
{
    if (input.size() <= 1) return input;
    std::vector<double> res;
    for(int j=0; j<input.size(); j++) {
        int j_left = j - 1;
        int j_right = j + 1;
        if (j_left < 0) {
            j_left = 0;
            j_right = 1;
        }
        if (j_right >= input.size()){
            j_right = input.size() - 1; 
            j_left = j_right - 1;
        }
        double dist_grad = (input[j_right] - input[j_left]) / (2.0*h);
        res.push_back(dist_grad);
    }
    return res;
}
double TOV::h_at_r(double x)
{
    auto spline = pchip<decltype(r_s)>(r_s,h_s);
    return spline(x);
    
}
void TOV::tovEquations(double r, Array y, Array yprime)
{
    if(y[2]<eos.p_surface)
    {
        eps=0.0;
    }
    else{
        eps = eos.e_at_p(y[2]);
    }
    yprime[0] = 4*M_PI*pow(r,2.0)*eps;
    yprime[1] = 2.0*(y[0] + 4.0*M_PI*pow(r,3.0)*y[2])/(r*(r-2.0*y[0]));
    yprime[2] = -(eps + y[2])*(y[0] + 4.0*M_PI*pow(r,3.0)*y[2])/(r*(r-2.0*y[0]));
}
void TOV::integrateTOV()
{
    
    istate=1;
    r_vec = linspace(0.0,r_max_surface,RDIV);
    dr=r_vec[1]-r_vec[0];
    m_c = 0.0;
    nu_c = -1.0;
    p_c = eos.p_at_e(eps_c);
    m_1 =(4.0/3.0)*M_PI*eps_c*pow(dr,3.0);
    nu_1= nu_c + 4.0*M_PI*(p_c+(1.0/3.0)*eps_c)*pow(dr,2.0);
    p_1= p_c - (2.0*M_PI)*(eps_c+p_c)*(p_c+(1.0/3.0)*eps_c)*pow(dr,2.0);
    y = {m_c,nu_c,p_c};

    massProfile.push_back(y[0]);
    metricProfile.push_back(y[1]);
    pressureProfile.push_back(y[2]);
    densityProfile.push_back(eos.e_at_p(y[2]));
    radiusProfile.push_back(0.0);

    r=dr;
    rout=r+dr;
    idx=1;

    y = {m_1,nu_1,p_1};
    LSODA lsoda;

    while(y[2]>eos.p_surface && r<r_vec[RDIV-1]){

        radiusProfile.push_back(r);
        massProfile.push_back(y[0]);
        metricProfile.push_back(y[1]);
        pressureProfile.push_back(y[2]);
        densityProfile.push_back(eos.e_at_p(y[2]));
        lsoda.lsoda_update(this, &TOV::tovEquations, neq, y, yout, &r, rout, &istate,rtol,atol);
        rout += dr;
        y[0] = yout[1];
        y[1] = yout[2];
        y[2] = yout[3];
        idx += 1;
        if(istate==-3 || isnan(massProfile[idx-2]) || isnan(pressureProfile[idx-2])) break;
  }
  idxlast=idx-1;

  radius = r_vec[idxlast]*CGS::Length/pow(10,5);
  mass = massProfile[idxlast];

  double metric_surface_old = metricProfile[idxlast];
  double metric_surface = log(1.0-2.0*mass/radius);
  for (auto& nu:metricProfile){
    nu+=metric_surface-metric_surface_old;
  } 

}
