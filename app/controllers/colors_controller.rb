class ColorsController < ApplicationController
  respond_to :json
  respond_to :html, :only => :index

  before_filter :find_color, :only => [:show, :update, :destroy]

  def index
    respond_with Color.filter(request.query_parameters).all do |format|
      format.html do
        render :template => 'index', :layout => false
      end
    end
  end

  def create
    @color = Color.new(params[:color])
    @color.update_by(current_user).save

    respond_with @color
  end

  def show
    respond_with @color
  end

  def update
    @color.update_by(current_user).update_attributes(params[:color])

    respond_with @color
  end

  def destroy
    @color.update_by(current_user).destroy

    respond_with @color
  end

  private

  def find_color
    @color = Color.find(params[:id])
  end
end
