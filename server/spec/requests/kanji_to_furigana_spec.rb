# frozen_string_literal: true

require 'rails_helper'
require 'webmock/rspec'

describe '文章をひらがなに変換する機能', type: :request do
  subject { get api_furigana_path(params) }

  let(:params) { { word: '毎日学校に行きます' } }
  let(:expected_response) { { "translated": 'まいにちがっこうにいきます' } }

  context '漢字がある文章のデータを受ける' do
    it '文書の漢字はひらがなに変換される' do
      subject
      expect(response.body).to(eq(expected_response.to_json))
    end
  end
end
