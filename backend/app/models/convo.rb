class Convo < ApplicationRecord
  has_many :messages
  has_many :thoughts, through: :messages
end
