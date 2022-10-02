# frozen_string_literal: true

class API::KanjiToFuriganaController < ApplicationController
  before_action :check_params, only: :index

  def index
    render(json: { translated: @word.to_kana })
  end
end