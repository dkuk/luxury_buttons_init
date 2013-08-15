class CreateLuButtonOptions < ActiveRecord::Migration
  
  def change
    create_table :lu_button_options do |t|
      t.integer  :lu_button_id, :null => false
      t.string   :option_type
      t.integer  :option_id
      t.boolean  :invert, :null => false, :default => false

      t.timestamps
     end
  end

end