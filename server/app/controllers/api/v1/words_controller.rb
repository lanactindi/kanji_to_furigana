# frozen_string_literal: true

require 'uri'
require 'net/http'
require 'addressable'
require 'tataki'
require 'cgi'

class Api::V1::WordsController < ApplicationController
  def vietnamese_search
    word = params[:word]
    return unless word

    uri = Addressable::URI.parse("https://api.tracau.vn/WBBcwnwQpV89/dj/#{word}")
    req = Net::HTTP::Get.new(uri)
    res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') do |http|
      http.request(req)
    end
    render(json: res.body)
  end

  def english_search
    word = params[:word]
    return unless word

    uri = URI("https://kanjiapi.dev/v1/kanji/#{CGI.escape(word)}")
    req = Net::HTTP::Get.new(uri)
    res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') do |http|
      http.request(req)
    end
    render(json: res.body)
  end

  def kanji_to_furigana
    word = params[:word]
    return unless word

    render(json: { translated: word.to_kana })
  end
end
