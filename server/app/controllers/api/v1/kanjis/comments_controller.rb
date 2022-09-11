class Api::V1::Kanjis::CommentsController < ApplicationController
  def create
    kanji = params[:kanji]
    content = params[:content]
    user = params[:user]
    comment = Comment.new(user: user, content: content, kanji: kanji)
    if comment.save
      render json: comment
    end
  end

  def index
    kanji = params[:kanji]
    comments = Comment.kanji(kanji)
    render json: comments
  end
end
  