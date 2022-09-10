Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      get '/words/:word/vietnamese', to: "words#vietnamese_search"
      get '/words/:word/english', to: "words#english_search"
      get '/words/:word/furigana', to: "words#kanji_to_furigana"
      namespace 'vocabularies' do
        post '/:vocabulary/comments', to: "comments#create"
        get '/:vocabulary/comments', to: "comments#index"
      end
    end
  end
end
