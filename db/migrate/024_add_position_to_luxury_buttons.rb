class AddPositionToLuxuryButtons < ActiveRecord::Migration
  def change
    add_column :lu_buttons, :position, :integer, :null => false, :default => 0
  end
end
