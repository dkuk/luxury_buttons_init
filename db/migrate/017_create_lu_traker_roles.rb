class CreateLuTrakerRoles < ActiveRecord::Migration
  def change
    create_table :lu_tracker_roles do |t|
      t.integer  :tracker_id
      t.integer  :role_id
      t.timestamps
     end
  end

end