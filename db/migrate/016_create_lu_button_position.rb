class CreateLuButtonPosition < ActiveRecord::Migration
  
  def change
    create_table :lu_button_position do |t|
      t.integer  :lu_button_id, :null => false
      t.integer  :issue_status_id, :null => false
      t.integer  :tracker_id, :null => false
      t.integer  :role_id, :null => false
      t.integer  :position, :null => false, :default => 0

      t.timestamps
     end
  end

end