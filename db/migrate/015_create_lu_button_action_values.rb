class CreateLuButtonActionValues < ActiveRecord::Migration
  
  def change
    create_table :lu_button_action_values do |t|
      t.integer  :lu_button_action_id, :null => false
      t.string   :value_type # cf, role, field, text
      t.text     :value
      t.boolean  :is_default

      t.timestamps
     end
  end

end