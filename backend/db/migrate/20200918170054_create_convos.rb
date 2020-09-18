class CreateConvos < ActiveRecord::Migration[6.0]
  def change
    create_table :convos do |t|
      t.string :title

      t.timestamps
    end
  end
end
