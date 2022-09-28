# quickStar

This is a fully interactive, easy-to-use, online tool for constructing accurate non-rotating relativistic star models. With a rich collection of [realistic neutron star equations of state](https://ui.adsabs.harvard.edu/abs/2021PhRvD.103l3004B/abstract)[^1] as well as a polytropic approximation option, one can effortlessly explore and visualize the individual effects of central density and different matter configurations, on the internal structure and macroscopic properties of a relativistic star.

The  Tolman–Oppenheimer–Volkoff (TOV) system of ODEs is solved by implementing a [C++11 version of LSODA](https://github.com/dilawar/libsoda-cxx)[^2]. Additionaly, some modules from the [BOOST](https://github.com/boostorg/boost)[^3] C++ library are used to interpolate the tabulated equations of state, and also to find the central pressure in polytropic equations of state.

The TOV solver is implemented in C++, and compiled with [Emscripten](https://emscripten.org)[^4] into WebAssembly code, which is then [in-lined into a ES6 JavaScript module](https://github.com/bobbiec/react-wasm-demo)[^5]. The final project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


[^1]:https://ui.adsabs.harvard.edu/abs/2021PhRvD.103l3004B/abstract (table IX)
[^2]:https://github.com/dilawar/libsoda-cxx
[^3]:https://github.com/boostorg/boost
[^4]:https://emscripten.org
[^5]:https://github.com/bobbiec/react-wasm-demo
