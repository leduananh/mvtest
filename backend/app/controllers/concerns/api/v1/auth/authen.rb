module Api
  module V1
    module Authen
      extend ActiveSupport::Concern

      included do
        before_action :authenticate_request!, if: -> { authentication_required? }
      end

      private

      def authentication_required?
        self.class.authentication_required_for_action?(action_name)
      end

      def authenticate_request!
        unless valid_token?
          raise Errors::UnAuthorizedError.new
        end
      end

      def valid_token?
        token = extract_token_from_header

        token.present?
      end

      def extract_token_from_header
        header = request.headers['Authorization']
        return nil unless header.present?

        header.split(' ').last
      end

      module ClassMethods
        def authentication_required_for_action?(action_name)
          @authentication_required_actions ||= []
          @authentication_required_actions.include?(action_name.to_sym)
        end

        def requires_authentication_for(*actions)
          @authentication_required_actions ||= []
          @authentication_required_actions.concat(actions.map(&:to_sym))
        end
      end

    end
  end
end
