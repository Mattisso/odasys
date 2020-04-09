const {customIterator,addItem, getCount, getItems}=require('../sharedkernel/odaiterator/odaiterator').toinit();

const {objocomptedata,arrocomptedata}=require('../testing/data/ocomptedata').toinit();



 //while(odaiterator(oreferencedata).hasNext()===true) {
   // console.log(odaiterator(oreferencedata).current());
    //console.log(odaiterator(oreferencedata).next());
   // console.log(odaiterator(oreferencedata).rewind());
//console.log(odaiterator(oreferencedata).current());
//}  
//console.log(odaiterator(oreferencedata).next());
//console.log(odaiterator(oreferencedata).rewind())
//console.log(odaiterator(oreferencedata).current());

//console.log(next());
//console.log(hasNext());
/* odaiterator.myiterator(oreferencedata).rewind();*/
// console.log(odaiterator.myiterator(oreferencedata).current()); 

//console.log(odaiterator.reverseArrayIterator(oreferencedata).next().value);
//console.log(oreferencedata.length);
const obj={
    "NumCompte": "102010",
    "IntitulCompte": "Dotation BENIN",
    "SoldeCredit": 44829579
}
const obj1={
    "NumCompte1": "102020",
    "IntitulCompte1": "Dotation BURKINA",
    "SoldeCredit1": 65643312
}

//console.log(addItem(obj));
console.log(getCount(arrocomptedata));