class CreateLuButtonUserCustomFieldOptions < ActiveRecord::Migration
  
  def change
    create_table :lu_button_user_custom_field_options do |t|
      t.integer  :lu_button_id, :null => false
      t.integer  :custom_field_id, :null => false
      t.boolean  :invert, :null => false, :default => false

      t.timestamps
     end
  end

end