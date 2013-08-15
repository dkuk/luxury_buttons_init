class AddTakeNewToLuButtonActions < ActiveRecord::Migration
  def change
    add_column :lu_button_actions, :take_new, :boolean, :null => false, :default => false
  end
end