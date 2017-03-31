/**
 * main
 * Instantiate the CMAP class, and initialize it.
 * Also the entry point for javascript bundler.
 */
import {CMAP} from './CMAP';

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  // support commonjs loading, if it exists.
  module.exports = CMAP;
}
else {
  // otherwise put cmap constructor in window global
  window.cmap = CMAP;
}

// wait for DOM ready
// create a default instance of cmap to launch
const evtName = 'DOMContentLoaded';
const loadedHandler = evt => {
  let _cmap = new CMAP();
  console.log(`cmap v${_cmap.version}`);
  _cmap.init();
  document.removeEventListener(evtName, loadedHandler);
};
document.addEventListener('DOMContentLoaded', loadedHandler);
