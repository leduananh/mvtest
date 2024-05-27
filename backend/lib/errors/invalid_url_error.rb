module Errors
  class InvalidURLError < ApplicationError
    def initialize(details = nil)
      super("Invalid YouTube URL", status: :bad_request, error: "invalid_url", details: details)
    end
  end
end
