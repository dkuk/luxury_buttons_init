if(!Array.prototype.indexOf)
    Array.prototype.indexOf = function(searchElement, fromIndex){
        for(var i = fromIndex||0, length = this.length; i<length; i++)
            if(this[i] === searchElement) return i;
        return -1
};

$(document).ready(function(){

  jQuery(document.body).on("click", "a.close-grey-form", function(){
    jQuery(this).parent().hide();
    $(".lu_button").removeClass("opal");
    return false;
  });

  jQuery(document.body) .on("click",".cancel_from_button",function(){
    $("#button_action_form").hide();
    $(".lu_button").removeClass("opal");
    return false;
  });

  jQuery(document.body).on("click", ".lu_button", function(){
    if ($(this).hasClass("no_inputs")){
      var form = document.createElement("form");
      form.setAttribute("method", "post");
      form.setAttribute("action", "/issues/"+$(this).attr('data-issue-id').toString());
      params = { 'button_id': $(this).attr('data-button-id'), 
                 'issue[lock_version]': $(this).attr('data-lock-version'), 
                 '_method': 'put', 
                 'authenticity_token': $("#current_auth_token").val() }

      for(var key in params) {
        if(params.hasOwnProperty(key)) {
          var hiddenField = document.createElement("input");
          hiddenField.setAttribute("type", "hidden");
          hiddenField.setAttribute("name", key);
          hiddenField.setAttribute("value", params[key]);
          form.appendChild(hiddenField);
         }
      }

      document.body.appendChild(form);
      form.submit();
    }
    else {
      $(".lu_button").addClass("opal");
      $(this).removeClass("opal");
      $('#action_fields').html("<div class='loader form_loader'></div>");
      $('#action_fields').load('/lu_buttons/'+$(this).attr('data-button-id')+'/form/'+$(this).attr('data-issue-id'));
      $("#action_fields, #button_action_form").show();
      return false;
    }
  });

  jQuery(document.body).on("click", ".quote-link", function(){
    $('#action_fields').html("<div class='loader form_loader'></div>");
    $('#action_fields').load($(this).attr('data-href'));
    $("#button_action_form, #action_fields").show();
    // return false;
  });

});

function bind_qoute_links_to_button(href){
  $("div.contextual a[href*='issues'][href*='quot']").each(function(){
    var params = $(this).attr('href').split('?');
    var new_href = href+'?do_quote=y';
    if (params.length == 2) {
      new_href += '&'+params[1];
    }
    $(this).attr("href", "#button_bar");
    $(this).attr('data-href', new_href);
    $(this).removeAttr('data-remote');
    $(this).removeAttr('data-method');
    $(this).addClass('quote-link');
  });  
}