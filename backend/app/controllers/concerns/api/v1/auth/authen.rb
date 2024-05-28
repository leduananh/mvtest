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
        token = extract_token_from_header

        unless token.present?
          raise Errors::UnAuthorizedError.new('missing authorize header')
        end

        claims = JwtService.decode(token)

        finger_print = @rq_device_info[:existing_device][:finger_print]

        unless finger_print.present?
          raise Errors::UnAuthorizedError.new('request with authorize header w  as send from unknown device')
        end

        @current_user = User.find_by(id: claims[:user_id])

        user_token = @current_user.find_auth_token_by_jti_and_fingerprint(claims[:jti], finger_print)

        unless user_token.present?
          raise Errors::UnAuthorizedError.new("authorize token belong to different device, please sign in again on this device")
        end
      end

      # def valid_token?
      #   token = extract_token_from_header
      #
      #   token.present?
      # end

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
