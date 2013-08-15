class CreateLuButtonUserRoleOptions < ActiveRecord::Migration
  
  def change
    create_table :lu_button_user_role_options do |t|
      t.integer  :lu_button_id, :null => false
      t.integer  :role_id, :null => false
      t.boolean  :invert, :null => false, :default => false

      t.timestamps
     end
  end

end