###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Methods defined in the helpers block are available in templates
helpers do

  def image_tag name:'0.gif', sizes:{} 
    if sizes.length > 0
      sizes.map! {|size| "images/#{size[1]}/#{name}.jpg #{size[0]}w" }
      srcset = sizes.join(', ').sub(' 0w', '')
      "<img src='images/0.gif' data-srcset='#{srcset}' >"
    else
      "<img src='images/0.gif' data-srcset='images/#{name}.jpg' >"
    end
  end

  # def some_helper
  #   "Helping"
  # end
end

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload, :apply_js_live => false
end

# set :haml, { :ugly => false, :format => :html5 }

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end

###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }



