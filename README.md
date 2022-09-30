# quickStar

This is a fully interactive, easy-to-use, online tool for constructing accurate non-rotating relativistic star models. With a rich collection of [realistic neutron star equations of state](https://ui.adsabs.harvard.edu/abs/2021PhRvD.103l3004B/abstract)[^1] as well as a polytropic approximation option, one can effortlessly explore and visualize the individual effects of central density and different matter configurations, on the internal structure and macroscopic properties of a relativistic star.

The [TOV solver](https://github.com/esmyrnio/cppTOV) is implemented in C++, and compiled with [Emscripten](https://emscripten.org)[^2] into WebAssembly code, which is then [in-lined into a ES6 JavaScript module](https://github.com/bobbiec/react-wasm-demo)[^3]. The final project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


[^1]:https://ui.adsabs.harvard.edu/abs/2021PhRvD.103l3004B/abstract (table IX)
[^2]:https://emscripten.org
[^3]:https://github.com/bobbiec/react-wasm-demo
