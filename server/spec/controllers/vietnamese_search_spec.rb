# frozen_string_literal: true

require 'rails_helper'
require 'webmock/rspec'

describe '漢字をベトナム語に翻訳する機能', type: :request do
  subject { get api_vietnamese_path(params) }

  let(:params) { { word: '目的' } }

  context 'Tracau Api' do
    before do
      word_api_request
    end

    it 'is access tracau api' do
      expect { subject }.not_to(raise_error)
    end
  end

  def word_api_request
    WebMock.stub_request(:get, "https://api.tracau.vn/WBBcwnwQpV89/dj/#{params[:word]}")
           .to_return(
             body: File.read("#{Rails.root}/spec/fixtures/tracau/response.json"),
             status: 'OK',
             headers: { 'Content-Type' => 'application/json' }
           )
  end
end
