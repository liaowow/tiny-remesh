json.extract! convo, :id, :title, :created_at, :updated_at
json.url convo_url(convo, format: :json)
