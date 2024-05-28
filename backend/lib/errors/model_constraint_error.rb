module Errors
  class ModelConstraintError < ApplicationError
    def initialize(details = nil)
      super("Record not unique on column: ", status: :bad_request, error: "unauthorized", details: details)
    end
  end
end
