class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.string :user
      t.text :content
      t.string :kanji
      t.string :vocabulary

      t.timestamps
    end
  end
end
