json.comment do
  user = @comment.user

  json.id @comment.id
  json.content @comment.content
  json.user do
    json.name user.name
  end
  json.created_at
end
