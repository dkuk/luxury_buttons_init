class CreateLuButtonIssueCustomFieldOptions < ActiveRecord::Migration
  
  def change
    create_table :lu_button_issue_custom_field_options do |t|
      t.integer  :lu_button_issue_option_id, :null => false
      t.integer  :custom_field_id, :null => false
      
      t.timestamps
     end
  end

end