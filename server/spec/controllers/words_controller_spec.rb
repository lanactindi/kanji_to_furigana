# frozen_string_literal: true

require 'rails_helper'
require 'webmock/rspec'
require 'cgi'

describe 'Api::V1::WordsController', type: :request do
  describe '#viewnamese_search' do
    subject { get api_v1_vietnamese_path(params) }

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

  describe '#english_search' do
    subject { get api_v1_english_path(params) }

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

  describe '#kanji_to_furigana' do
    subject { get api_v1_furigana_path(params) }

    let(:params) { { word: '毎日学校に行きます' } }
    let(:expected_response) { { "translated": 'まいにちがっこうにいきます' } }

    context '漢字がある文章のデータを受ける' do
      it '文書の漢字はひらがなに変換される' do
        subject
        expect(response.body).to(eq(expected_response.to_json))
      end
    end
  end
end
