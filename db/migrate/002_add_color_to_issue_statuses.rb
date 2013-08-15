class AddColorToIssueStatuses < ActiveRecord::Migration
  def change
    add_column :issue_statuses, :color, :string
  end
end