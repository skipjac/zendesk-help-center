//this function will walk all the way down the JSON object into all the arrays and create flat JSON object. 
function flattenObject(ob) {
    var toReturn = {};
    for (var i in ob) {
        if (!ob.hasOwnProperty(i)) continue;
        if ((typeof ob[i]) == 'object' && ob[i] !== null) {
            var flatObject = flattenObject(ob[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;
                toReturn[i + '.' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
}
// this function goes through the listOfDefaults object and searches for each default value in the listed ticket field
function setDefaultVaule(field, setDefault){
   $('.request_custom_fields_' + field).one('DOMNodeInserted', function(d){
     var TestObj = $(d.currentTarget).children('input').data('tagger');
     var test = flattenObject(TestObj);
     var myRe = /value$/g;
     for (var key in test) {
      var isValue = myRe.test(key);
      if (isValue && test[key] === setDefault) {
          $(d.currentTarget).val(test[key]);
          $(d.target).text(label);
          return;
      } else {
         var label = test[key];
      }
    }
   });
  }
//build a JSON object with the ticket field ID as the key to the default tag value you want to set
var listOfDefaults = { '22103126' : 'tree__nest_in__bird_type', '21631456': 'dog'};
$(document).ready(function(){
 for(var key in listOfDefaults){
   setDefaultVaule(key, listOfDefaults[key]);
 }
});