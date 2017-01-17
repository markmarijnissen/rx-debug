var Rx = require('rxjs');

// Utility to log
/* eslint no-console: "off" */
Rx.Observable.prototype.debug = function debug(name){

  let stream = this.do({
    next: v => console.log('%c'+name,'color: #8cb8af;', v),
    error: err => console.log('%c'+name+'error:','color: red;', err),
    complete: () => console.log('%c'+name+'completed.','color: green;')
  });
  if(process.env !== 'PRODUCTION'){
    const subject = new Rx.Subject;
    global[name] = subject;
    stream = stream.merge(subject);
  }
  return stream;
}
