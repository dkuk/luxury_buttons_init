class CreateLuButtons < ActiveRecord::Migration
  
  def change
    create_table :lu_buttons do |t|
      t.string  :name, :null => false
      t.string  :css_class
      t.string  :description
      t.integer :lu_button_group_id

      t.timestamps
     end
  end

end
