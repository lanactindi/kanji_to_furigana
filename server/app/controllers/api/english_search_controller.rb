# frozen_string_literal: true

class API::EnglishSearchController < ApplicationController
  before_action :check_params, :load_english_uri, :render_response, only: :index

  def index; end

  private

  def load_english_uri
    @uri = URI("https://kanjiapi.dev/v1/kanji/#{CGI.escape(@word)}")
  end
end
