class AddUserDescriptionToLuButtons < ActiveRecord::Migration
  def change
    add_column :lu_buttons, :user_description, :text
  end
end
