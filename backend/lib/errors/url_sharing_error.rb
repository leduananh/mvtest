module Errors
  class URLSharingError < ApplicationError
    def initialize(details = nil)
      super("Failed to share URL", status: :unprocessable_entity, error: "url_sharing_error", details: details)
    end
  end
end
