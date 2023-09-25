import { sayHello } from './helpers.js';
import utils from './js/utils.js';


let win = nw.Window.get();
console.log( win );

win.on( 'close', () => {
    console.log( 'close called !!!' );
    process.exit();
} );

//document.getElementById( 'btnTest').addEventListener( 'click', sayHello );
document.getElementById( 'btnTest').addEventListener( 'click', utils.sayHello );