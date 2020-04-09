
const {seedolevel$}=require('./index').toinit();
const { pipe} = require('rxjs');
const { map} = require('rxjs/operators');


require('../../config/ohadb').connectserver();


const getoreportdetail$ =  seedolevel$;

  const getObserverdata = pipe(
  map(n => n)
 // ,tap(ev => console.log(ev))
  //,take(2)

);
//const p1=getObserverdata(_insert$);
//const p2=getObserverdata(_remove$);

const getoreportdetailR$ = getObserverdata(getoreportdetail$);

seedolevel$.subscribe({
  next: x=>console.log(x),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('all seeds completed')
}

).unsubscribe();
