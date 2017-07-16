let str = 'name=zfpx; age=i@you';
//sep = 分割 split sperate
//eq  = 等于  equals
function parse(str,sep,eq){
  sep = sep||'&';
  eq =  eq || '=';
  let fields = str.split(sep);
  //["name=zfpx","age=i@you"]
  let obj ={};
  for(let i=0;i<fields.length;i++){
    let field = fields[i];//name=zfpx age=i@you
    let entry = field.split(eq);
    // ["name","zfpx"]   ["age","i@you"]
    obj[entry[0]] = entry[1];
  }
  return obj;
}
let obj = parse(str,'; ');
console.log(obj);

