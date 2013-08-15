#  coding: utf-8 
class CreateLuButtonTypes < ActiveRecord::Migration

  def change
    create_table :lu_button_types do |t|
      t.string  :name, :null => false
    end

    LuButtonType.create(:name => "Стандартная") # l(:lu_button_type_common)
    LuButtonType.create(:name => "С комментарием") # l(:lu_button_type_with_comment)
    LuButtonType.create(:name => "Логирование времени") # l(:lu_button_type_timelog)
    LuButtonType.create(:name => "Комментарий") # l(:lu_button_type_comment)
    LuButtonType.create(:name => "Откат") # l(:lu_button_type_rollback)
  end  
end