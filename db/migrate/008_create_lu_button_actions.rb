class CreateLuButtonActions < ActiveRecord::Migration
  
  def change
    create_table :lu_button_actions do |t|
      t.integer  :lu_button_id, :null => false
      t.string   :field_name, :null => false
      t.string   :action
      # t.text     :values
      # t.string   :default_value
      t.boolean  :required, :null => false, :default => true
      t.boolean  :overwrite, :null => false, :default => true
      t.integer  :position, :null => false, :default => 0

      t.timestamps
     end
  end

end