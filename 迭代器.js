function *foo(){
  let x = yield 2;
  z++;
  let y = yield (x * z);
  console.log(x, y, z);
}

let z = 1;
let it1 = foo();
let it2 = foo();

let val1 = it1.next().value //2 yield
console.log(val1);
let val2 = it2.next().value //2 yield
console.log(val2);

val1 = it1.next(val2 * 10).value //x = 20 z = 2
console.log(val1);// 40 yield
val2 = it2.next(val1 * 5 ).value //x = 200 z = 3
console.log(val2);// 600 yield
it1.next( val2 / 2 );//y = 600/2  300 x = 20 z = 3

it2.next( val1 / 4 );// y = 10 x = 200 z = 3
