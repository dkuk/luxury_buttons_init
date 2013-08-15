class AddLockedToLuxuryButtons < ActiveRecord::Migration
  def change
    add_column :lu_buttons, :locked, :boolean, :null => false, :default => false
  end
end