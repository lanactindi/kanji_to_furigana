# frozen_string_literal: true

require 'uri'
require 'net/http'
require 'addressable'
require 'tataki'
require 'cgi'

class Api::V1::WordsController < ApplicationController
  before_action :check_params, only: %i[vietnamese_search english_search kanji_to_furigana]
  before_action :load_vietnamese_uri, only: :vietnamese_search
  before_action :load_english_uri, only: :english_search
  before_action :render_response, only: %i[vietnamese_search english_search]

  def vietnamese_search; end

  def english_search; end

  def kanji_to_furigana
    render(json: { translated: @word.to_kana })
  end

  private

  def check_params
    @word = params[:word]
    return unless @word
  end

  def load_vietnamese_uri
    @uri = Addressable::URI.parse("https://api.tracau.vn/WBBcwnwQpV89/dj/#{@word}")
  end

  def load_english_uri
    @uri = URI("https://kanjiapi.dev/v1/kanji/#{CGI.escape(@word)}")
  end

  def render_response
    return unless @uri

    req = Net::HTTP::Get.new(@uri)
    @res = Net::HTTP.start(@uri.hostname, @uri.port, use_ssl: @uri.scheme == 'https') do |http|
      http.request(req)
    end
    render(json: @res.body)
  end
end
