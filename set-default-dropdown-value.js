
//walk the ticket field data object
function traverse(obj,func, parent) {
  for (i in obj){
    func.apply(this,[i,obj[i],parent]);      
    if (obj[i] instanceof Object && !(obj[i] instanceof Array)) {
      traverse(obj[i],func, i);
    }
  }
}
//traverse the ticket field data obj and flatten it if nested 
function getPropertyRecursive(obj, property){
  var acc = [];
  traverse(obj, function(key, value, parent){
    if(key === property){
      acc.push({parent: parent, value: value});
    }
  });
  return acc;
}
//set the defatul value
function setDefaultVaule(field, setDefault){
   $('.request_custom_fields_' + field).one('DOMNodeInserted', function(d){
     //console.log($(d.currentTarget).children('input').data('tagger'));
     var TestObj = $(d.currentTarget).children('input').data('tagger');
     //console.log(getPropertyRecursive(TestObj, 'id'));
     var flattenTree = getPropertyRecursive(TestObj, 'id');
     var skip = jQuery.map(flattenTree, function(obj) {
       if(obj.value === setDefault)
         return obj; // or return obj.name, whatever.
     });
     $(d.currentTarget).val(skip[0].value);
     $(d.target).text(skip[0].parent);
   });
  }
//build a list of ticket field ID's and their defalut tag value
var listOfDefaults = { '22103126' : 'tree__nest_in__bird_type', '21631456': 'dog'};
//wait until things are loaded and run the function
$(document).ready(function(){
 
for( key in listOfDefaults){
  console.log(key + ' ' + listOfDefaults[key]);
  setDefaultVaule(key, listOfDefaults[key]);
}
})
