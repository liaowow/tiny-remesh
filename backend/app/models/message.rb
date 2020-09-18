class Message < ApplicationRecord
  belongs_to :convo
  has_many :thoughts
end
