module Errors
  class DatabaseError < ApplicationError
    def initialize(details = nil)
      super("Error while processing data", status: :internal_server_error, error: "database", details: details)
    end
  end
end
