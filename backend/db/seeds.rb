# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'
require 'database_cleaner'
DatabaseCleaner.clean_with(:truncation)

## CONVOS (Faker: book titles)
5.times do
  Convo.create(title: Faker::Book.title)
end

## MESSAGES (Faker: yoda quotes)
10.times do
  Message.create(text: Faker::Quote.yoda, convo_id: rand(1..5))
end

## THOUGHTS (Faker: paragraphs)
30.times do
  Thought.create(text: Faker::Lorem.paragraph(sentence_count: 3), message_id: rand(1..10))
end