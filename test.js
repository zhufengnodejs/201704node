let EventEmitter = require('events');
let e = new EventEmitter();
//docuemnt.addEventListener('click',functon(){})
e.on('click',function(){console.log('click')});
e.emit('click');