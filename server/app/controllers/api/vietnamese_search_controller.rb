# frozen_string_literal: true

require 'uri'
require 'net/http'
require 'addressable'

class API::VietnameseSearchController < ApplicationController
  before_action :check_params, :load_vietnamese_uri, :render_response, only: :index

  def index;end

  private

  def load_vietnamese_uri
    @uri = Addressable::URI.parse("https://api.tracau.vn/WBBcwnwQpV89/dj/#{@word}")
  end
end