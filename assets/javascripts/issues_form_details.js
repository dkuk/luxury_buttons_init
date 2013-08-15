function prepare_new_issue_form() {
  if (typeof new_isssue_record == 'undefined')
    return false;

  hide_trackers();
  if(new_isssue_record) {
    if(hide_watchers_form)
      $('#watchers_form').hide()
    if(attachments_form)
      $('#attachments_form').hide() 
  }
}

function hide_trackers() {
  if (typeof new_isssue_record == 'undefined')
    return false;

  if(new_isssue_record) {
    if(hide_assigned_to_id)
      $('#issue_assigned_to_id').parent().hide() 
    if(hide_check_date)
      $('#issue_check_date').parent().hide() 
    if(hide_executor)
      $('#issue_executor_id').parent().hide()
  }

  $('#issue_tracker_id option').each(function(){
    if(!(available_trackers.indexOf(parseInt($(this).attr('value')))+1)) {
      if(!new_isssue_record) {
        if(current_tracker_id!=$(this).attr('value')) //Если это выбраное значение
          $(this).remove();
      }
      else
        $(this).remove();
    }
  });
    
  if((!(available_trackers.indexOf(parseInt(current_tracker_id))+1))&&(!new_isssue_record)) { //Если выбраного значения нет в доступных трекерах и форма редактирования
    $('#issue_tracker_id option').each(function(){
      if(current_tracker_id!=$(this).attr('value'))
        $(this).remove();
    });      
  }
}

jQuery(document).ready(function(){
  prepare_new_issue_form();

  jQuery("#all_attributes").ajaxStop(function(){
    prepare_new_issue_form();
  });
});
