module Errors
  class ApplicationError < StandardError
    attr_reader :status, :error, :details

    def initialize(message = "An error occurred", status: :internal_server_error, error: nil, details: nil)
      super(message)
      @status = status
      @error = error || message
      @details = details
    end
  end
end

