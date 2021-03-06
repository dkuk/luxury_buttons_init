class CreateLuButtonUserSpecificOptions < ActiveRecord::Migration
  
  def change
    create_table :lu_button_user_specific_options do |t|
      t.integer  :lu_button_id, :null => false
      t.string   :option_type, :null => false, :default => false
      t.boolean  :invert, :null => false, :default => false

      t.timestamps
    end
  end

end