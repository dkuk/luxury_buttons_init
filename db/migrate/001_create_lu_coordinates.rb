class CreateLuCoordinates < ActiveRecord::Migration
  
  def change
    create_table :lu_coordinates do |t|
      t.integer :tracker_id, :null => false
      t.integer :role_id, :null => false
      t.integer :issue_status_id, :null => false
      t.integer :x, :default => 5
      t.integer :y, :default => 5
     end
  end

end
