class AddLuButtonIdToJournals < ActiveRecord::Migration
  def change
    add_column :journals, :lu_button_id, :integer
  end
end