module Errors
  class ModelInvalidError < ApplicationError
    def initialize(details = nil)
      super("Record not unique on column: ", status: :bad_request, error: "record_invalid", details: details)
    end
  end
end
