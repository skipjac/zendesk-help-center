
//create your own helpcenter dropdown field and set a text field 
$('.request_custom_fields_21745801').hide();
//what element to place the 1st field after
var desc ='request_description';
//json setting for fields
var advertiserSettings = {"requests": "request_custom_fields_advertiser", "nameLocal": "advertiser", "label": "Advertiser", "textfield": "input#request_custom_fields_21745801"};
var campSettings = {"requests": "request_custom_fields_camp", "nameLocal": "camp", "label": "Camp", "textfield": "input#request_custom_fields_21745801"};
//json values for options 
var returnJson = {"Rows": [{ "AdvertiserID": 11256, "AdvertiserName": "johnson", "Tier": "" },{ "AdvertiserID": 11257, "AdvertiserName": "Miramax Films", "Tier": "" }]};
//function to build DOM
function makeDropdown(settings, data, att){
  var tagger = [{"label": "-","value": "" }];
    returnJson.Rows.forEach(function(d){
      tagger.push({"label": d.AdvertiserName,"value": d.AdvertiserID });
    });
    //var Advertiser = 'request_custom_fields_advertiser'
    var createRoot = document.createElement('div');
    var createLabel = document.createElement('label');
    var createInput = document.createElement('input');
    createLabel.setAttribute("for", settings.requests);
    createLabel.textContent = settings.label;
    createInput.setAttribute('id', settings.requests);
    createInput.setAttribute('type', 'hidden');
    createInput.setAttribute('size', '0');
    createInput.setAttribute('autocomplete', 'off');
    createInput.setAttribute('name', settings.nameLocal);
    createInput.setAttribute('data-tagger', JSON.stringify(tagger));
    console.log(tagger);
    createRoot.className = 'form-field string optional ' + settings.requests;
    createRoot.appendChild(createLabel);
    createRoot.appendChild(createInput);
    $('.' + att).after(createRoot);
    //listen for changes on fields you create 
    $('.' + settings.requests).change(function(e){
      console.log($(''+settings.textfield + ''));
      $(settings.textfield).attr('value',$('input[name="'+settings.nameLocal+'"]').siblings('.nesty-input').text());
    });
}
//run function passing in the settings, JSON object for options, and the field for the new field to follow
makeDropdown(advertiserSettings, returnJson, desc);
makeDropdown(campSettings, returnJson, advertiserSettings.requests);