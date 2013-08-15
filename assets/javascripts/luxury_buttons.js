if(!Array.prototype.indexOf)
    Array.prototype.indexOf = function(searchElement, fromIndex){
        for(var i = fromIndex||0, length = this.length; i<length; i++)
            if(this[i] === searchElement) return i;
        return -1
};

$(document).ready(function(){

  $(document.body).on("change", "#lu_button_lu_button_type_id", function(){
    if ( $(this).val() > 2 ) {
      $("#tab-options").trigger('click');
      $("#tab-actions").parent().hide();
    }
    else {
      $("#tab-actions").parent().show();
    }
  });

  $(document.body).on("change", "#role_id, #tracker_id",function(){
    $("#graph_selector").click();
    // $("#role_id, #tracker_id").attr("readonly","readonly");
  });

  // $(document.body).on("click", ".inverter", function(){
  //   field_id = $(this).attr('data-target-field');

  //   if ($('#'+field_id).val() == 'true'){
  //     $(this).children('.invert_part').hide();
  //     $('#'+field_id).val(false);
  //   }
  //   else {
  //     $(this).children('.invert_part').show();
  //     $('#'+field_id).val(true);
  //   }
  // });

  $(document.body).on("click", ".lu_button_editor", function(){
      $('#button_form').html("<div class='loader form_loader'></div>");
      $('#button_form_container').css("top",$(window).scrollTop()+45);
      $('#button_form_container').show();
      $('#lu_overlay').show(); 
      $('#button_form').load(this.href, function(){
          // $('#button_form').show(); 
          $('.tabs-buttons').hide()
      }); 
      return false;
  });

  $(document.body).on("click", ".form_closer, #lu_overlay", function(){
      $('#lu_overlay').hide();
      $('#button_form').html('');
      $('#button_form_container').hide();
      return false;
  });
  // $(document.body).on("click", ".form_closer", function(){
  //   $(this).parent().hide()
  // }); 

  $(document.body).on("change", "#lu_button_css_class", function(){
    $("#preview_button").attr("class", "lu_button no_redirect")
    $("#preview_button").addClass($(this).val());
  })

  $(document.body).on("change keyup input", "#lu_button_name", function(){
    $("#preview_text").html($(this).val())
  })

  $(document.body).on("click", "#lu_button_fast_action", function(){
    if($(this).attr("checked") == "checked"){
      $("#preview_fast").show();
    }
    else {
      $("#preview_fast").hide();
    }      
  })

});

function find_button_styles(){
  var btnClasses = [];
  var sSheetList = document.styleSheets;
  var preff = '.'+$("#css_class_preff").val();
  for (var i = 0; i < sSheetList.length; i++) {
      var ruleList = document.styleSheets[i].cssRules;
      for (var rule = 0; rule < ruleList.length; rule ++) {          
          if (typeof ruleList[rule].selectorText != "undefined" && ruleList[rule].selectorText.indexOf(preff) >= 0) {
              btnClasses.push( ruleList[rule].selectorText );
          }
      }
  }
  return btnClasses;
}

function resize_options_heights(){
  $(".button_options").each(function(){
    var num_opt = $(this).find("option").length;
    $(this).attr("size",num_opt)    
  });
}