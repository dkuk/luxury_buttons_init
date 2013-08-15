# Plugin's routes
# See: http://guides.rubyonrails.org/routing.html

resources :lu_coordinates do #, :only => [:show]
  collection do
    get  'index'
    get  'show_graph' #, :via => [:get,:post, :delete]
    post 'add_status/:status_id', :action => 'add_status'
    post 'save_position/:coords_id', :action => 'save_position'
    post 'save_status_color/:status_id', :action => 'save_status_color'
    delete 'remove_status/:coord_id', :action => 'remove_status'
  end
    
end

resources :lu_buttons do

  collection do
    post 'save_positions', :action => 'save_positions'
    get 'problem_buttons'
  end

  member do
    get 'form/:issue_id', :action => 'form'
    get 'copy', :action => 'copy'    
  end  
end

resources :lu_actions do
  collection do
  end

  member do
    post 'act/:issue_id', :action => 'act', :as => 'act'
  end
end


# match 'tracker/:tracker_id/project/:project_id', :controller => 'lu_tracker_roles', :action => 'edit', :tracker_id => /\d+/, :project_id => /\d+/, :via => :get
# match 'tracker/:tracker_id/project/:project_id', :controller => 'lu_tracker_roles', :action => 'save', :tracker_id => /\d+/, :project_id => /\d+/, :via => :post


resources :trackers do
  member do
    get 'project/:project_id', :action => 'form'    
  end  
end