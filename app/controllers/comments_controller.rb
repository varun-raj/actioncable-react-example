class CommentsController < ApplicationController
  before_action :set_message

  def create
    @comment = Comment.create! content: params[:comment][:content], message: @message, user: @current_user
    respond_to do |format|
      format.js { render nothing: true }
      format.json
    end
  end

  private
    def set_message
      @message = Message.find(params[:message_id])
    end
end
