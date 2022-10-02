# frozen_string_literal: true

require 'rails_helper'
require 'webmock/rspec'

describe '漢字を英語に翻訳する機能', type: :request do
  subject { get api_english_path(params) }

  let(:params) { { word: '目' } }

  context 'Tracau Api' do
    before do
      word_api_request
    end

    it 'is access kanjiapi api' do
      expect { subject }.not_to(raise_error)
    end
  end

  def word_api_request
    WebMock.stub_request(:get, "https://kanjiapi.dev/v1/kanji/#{CGI.escape(params[:word])}")
            .to_return(
              body: File.read("#{Rails.root}/spec/fixtures/kanjiapi.dev/response.json"),
              status: 'OK',
              headers: { 'Content-Type' => 'application/json' }
            )
  end
end
