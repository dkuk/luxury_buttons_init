# encoding: utf-8
require File.expand_path(File.dirname(__FILE__) + "/../../../../config/environment")
require File.expand_path(File.dirname(__FILE__) + "/../../../../config/application")

namespace :redmine do
  task :fill_button_types => :environment do
  	include Redmine::I18n

    if ENV['LANG'].is_a?(String) && (I18n.available_locales.include?(ENV['LANG']) || I18n.available_locales.include?(ENV['LANG'].to_sym) )
    	lang = ENV['LANG']
    	btn = LuButtonType.where(id: LuButtonType::COMMON_BUTTON).first_or_create
    	btn.name = ll(lang, :lu_button_type_common)
    	btn.save
    	btn = LuButtonType.where(id: LuButtonType::WITH_COMMENT_BUTTON).first_or_create
    	btn.name = I18n.ll(lang, :lu_button_type_with_comment)
    	btn.save
        btn = LuButtonType.where(id: LuButtonType::TIMELOG_BUTTON).first_or_create
    	btn.name = ll(lang, :lu_button_type_timelog)
    	btn.save
        btn = LuButtonType.where(id: LuButtonType::COMMENT_BUTTON).first_or_create
    	btn.name = ll(lang, :lu_button_type_comment)
    	btn.save
        btn = LuButtonType.where(id: LuButtonType::ROLLBACK_BUTTON).first_or_create
    	btn.name = ll(lang, :lu_button_type_rollback)
    	btn.save
    else
    	puts "Unsupported LANG=#{ENV['LANG'].inspect} \n"
    	puts "Use please one of: #{I18n.available_locales.map{|l| l.to_s}.inspect}\n\n"
    	puts "Example. rake redmine:fill_button_types LANG=en-GB"
    end
  end
end