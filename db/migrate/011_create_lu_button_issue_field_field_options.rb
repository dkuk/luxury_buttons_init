class CreateLuButtonIssueFieldFieldOptions < ActiveRecord::Migration
  
  def change
    create_table :lu_button_issue_field_field_options do |t|
      t.integer  :lu_button_issue_option_id, :null => false
      t.string   :field_name, :null => false
      
      t.timestamps
     end
  end

end