class Comment < ApplicationRecord
  scope :vocabulary, ->(vocabulary) { where(vocabulary: vocabulary).order(created_at: :desc) }
  scope :kanji, ->(kanji) { where(kanji: kanji).order(created_at: :desc) }
end
