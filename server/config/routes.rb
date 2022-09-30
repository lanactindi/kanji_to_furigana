Rails.application.routes.draw do
  namespace 'api' do
    get '/vietnamese/:word', to: "vietnamese_search#index", as: "vietnamese"
    get '/english/:word', to: "english_search#index", as: "english"
    get '/furigana/:word', to: "kanji_to_furigana#index", as: "furigana"
  end
end
