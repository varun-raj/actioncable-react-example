json.message do
    json.id @message.id
    json.title @message.title
    json.content @message.content

end
json.comments do
  json.array!(@comments) do |comment|
    user = comment.user

    json.id comment.id
    json.content comment.content
    json.user do
      json.name user.name
    end
    json.created_at
  end
end
