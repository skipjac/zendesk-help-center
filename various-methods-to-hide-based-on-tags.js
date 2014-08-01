
//hide ticket form from non paying customers 
(function(){
    $('option[value="641"]').wrap('<span class="hide-option"></span>');
    var isCust;
    function isCustomer(element, index, array){
      return (element === 'paying');
    }
    HelpCenter.user.organizations.forEach(function(x){
      isCust = x.tags.some(isCustomer);
      return (isCust === true);
    });
    if(isCust === true){
    $('option[value="641"]').unwrap('<span class="hide-option"></span>');
    }
}());

//parse organization tags for a regex value and return a portion of the tag
var accountID = '';
function isCustomer(element, index, array){
  var re = /orgid_\d+$/;
  if(re.test(element)){
    var accNum = element.split('_');
    return accountID = accNum[1];
   }
}
function parseOrg(element, index, array){
  element.tags.forEach(isCustomer);
}
HelpCenter.user.organizations.forEach(parseOrg);

