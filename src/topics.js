// define all PubSub message topics used by cmap
// (use this module's constants instead of harcoding strings everywhere)

export const newMap = 'newMap'; // create a new map button click
export const selectedMap = 'selectedMap'; // the selected map (canvas) changed
export const windowResize = 'windowResize'; // the window was resized
export const zoomMouseDrag = 'zoomMouseDrag'; // mouse drag-to-zoom event
export const zoomMouseWheel = 'zoomMouseWheel'; // mouse wheel-to-zoom event
export const move = 'move'; // move tool, drag event
export const reset = 'reset'; // reset button click

// layout change event: payload is a const from layouts.js
export const layout = 'layout';

 // for trying various layouts. payload is an integer, n
export const devNumberofMaps = 'devNumberofMaps';
