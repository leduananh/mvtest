module Errors
  class UnAuthorizedError < ApplicationError
    def initialize(details = nil)
      super("User unauthorized", status: :unauthorized, error: "unauthorized", details: details)
    end
  end
end
