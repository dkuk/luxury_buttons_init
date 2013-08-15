class AddCurrentUserToLuButtonIssueOptions < ActiveRecord::Migration
  def change
    add_column :lu_button_issue_options, :current_user, :boolean, :null => false, :default => false
  end
end