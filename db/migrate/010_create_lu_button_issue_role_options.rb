class CreateLuButtonIssueRoleOptions < ActiveRecord::Migration
  
  def change
    create_table :lu_button_issue_role_options do |t|
      t.integer  :lu_button_issue_option_id, :null => false
      t.integer  :role_id, :null => false
      
      t.timestamps
     end
  end

end