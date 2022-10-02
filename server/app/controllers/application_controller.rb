# frozen_string_literal: true

class ApplicationController < ActionController::API

  protected
  
  def check_params
    @word = params[:word]
    return render json: { error: 'Please choose a word.'}, status: 422 if @word.blank?
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
