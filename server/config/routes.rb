Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      get '/words/:word/vietnamese', to: "words#vietnamese_search", as: "vietnamese"
      get '/words/:word/english', to: "words#english_search", as: "english"
      get '/words/:word/furigana', to: "words#kanji_to_furigana", as: "furigana"
    end
  end
end
