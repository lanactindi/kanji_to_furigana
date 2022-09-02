require 'uri'
require 'net/http'
require 'addressable'

class Api::V1::WordsController < ApplicationController
  def search
    word = params[:word]
    uri = Addressable::URI.parse("https://api.tracau.vn/WBBcwnwQpV89/dj/#{word}")
    req = Net::HTTP::Get.new(uri)
    res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') { |http|
      http.request(req)
    }
    render json: res.body
  end
end
