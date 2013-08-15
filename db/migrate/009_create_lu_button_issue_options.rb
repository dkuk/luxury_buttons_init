class CreateLuButtonIssueOptions < ActiveRecord::Migration
  
  def change
    create_table :lu_button_issue_options do |t|
      t.integer  :lu_button_id, :null => false
      t.string   :field_name
      t.boolean  :invert, :null => false, :default => false
      t.boolean  :blank_field, :null => false, :default => false

      t.timestamps
     end
  end

end