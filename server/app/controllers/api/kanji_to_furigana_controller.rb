# frozen_string_literal: true

require 'tataki'

class API::KanjiToFuriganaController < ApplicationController
  before_action :check_params, only: :index

  def index
    render(json: { translated: @word.to_kana })
  end
end