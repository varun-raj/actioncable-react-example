class CommentRelayJob < ApplicationJob
  def perform(comment)
    ActionCable.server.broadcast "messages:#{comment.message_id}:comments",
      comment: { id: comment.id, content: comment.content, created_at: comment.created_at, user: {name: comment.user.name}}
  end
end