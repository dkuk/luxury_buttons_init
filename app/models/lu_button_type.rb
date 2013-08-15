class LuButtonType < ActiveRecord::Base
  unloadable

  COMMON_BUTTON  = 1
  WITH_COMMENT_BUTTON = 2
  TIMELOG_BUTTON = 3
  COMMENT_BUTTON = 4
  ROLLBACK_BUTTON = 5
end