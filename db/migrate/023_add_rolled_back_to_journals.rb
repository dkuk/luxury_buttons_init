#  coding: utf-8 
class AddRolledBackToJournals < ActiveRecord::Migration
  def change
    add_column :journals, :rolled_back, :boolean, :null => false, :default => false
  end

  # create new button type for rollback
  LuButtonType.create(:name => "Откат") if LuButtonType.where('id=5').empty?
end