module Errors
  class UnAuthorizedError < ApplicationError
    def initialize
      super("User unauthorized", status: :unauthorized, error: "unauthorized", details: details)
    end
  end
end
