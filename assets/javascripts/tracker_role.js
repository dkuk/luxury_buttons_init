$(document).ready(function(){
    $('form.edit_tracker .splitcontentleft .box.tabular').children().last().after('<p>'+$('#tracker_roles').html()+'</p>');
    $('#tracker_roles').remove();
    /*var tracker_form_id = $('form.edit_tracker').attr('id').split("_")
    var tracker_id = tracker_form_id[2]

    $('#tracker_project_ids input:checked').each(function(){
        $('body').children().first().before('<div class="modal_window" id="modal-mw_link_'+$(this).attr('value')+'" style="display: none;"></div>');
        $(this).parent().after(' (<a href="/tracker/'+tracker_id+'/project/'+$(this).attr('value')+'" class="in_link link_to_modal" id="mw_link_'+$(this).attr('value')+'">'+label_no_permissions+'</a>)')
        });*/
    });