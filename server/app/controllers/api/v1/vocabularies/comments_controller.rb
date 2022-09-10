class Api::V1::Vocabularies::CommentsController < ApplicationController
  def create
    vocabulary = params[:vocabulary]
    content = params[:content]
    user = params[:user]
    comment = Comment.new(user: user, content: content, vocabulary: vocabulary)
    if comment.save
      render json: comment
    end
  end

  def index
    comments = Comment.all
    render json: comments
  end
end
