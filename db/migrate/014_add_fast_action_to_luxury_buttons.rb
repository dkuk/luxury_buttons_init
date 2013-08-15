class AddFastActionToLuxuryButtons < ActiveRecord::Migration
  def change
    add_column :lu_buttons, :fast_action, :boolean, :null => false, :default => false
    add_column :lu_buttons, :save_prferences, :boolean, :null => false, :default => false
    add_column :lu_buttons, :lu_button_type_id, :integer, :null => false, :default => 1
  end
end
