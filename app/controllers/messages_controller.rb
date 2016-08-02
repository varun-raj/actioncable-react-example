class MessagesController < ApplicationController
  def index
    @messages = Message.all
  end

  def show
    @message = Message.find(params[:id])
    @comments = @message.comments.includes(:user)
    respond_to do |format|
      format.html
      format.json
    end
  end
end
