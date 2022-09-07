Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      get '/words/:word/vietnamese', to: "words#vietnamese_search"
      get '/words/:word/english', to: "words#english_search"
    end
  end
end
