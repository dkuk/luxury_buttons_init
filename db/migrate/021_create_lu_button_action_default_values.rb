class CreateLuButtonActionDefaultValues < ActiveRecord::Migration
  
  def change
    create_table :lu_button_action_default_values do |t|
      t.integer  :lu_button_action_id, :null => false
      t.string   :value_type # cf, role, field, text
      t.text     :value

      t.timestamps
     end
  end

end