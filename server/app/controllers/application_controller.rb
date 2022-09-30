# frozen_string_literal: true

class ApplicationController < ActionController::API

  protected
  
  def check_params
    @word = params[:word]
    return unless @word
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
