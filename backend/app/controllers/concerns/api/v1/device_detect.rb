module Api
  module V1
    module DeviceDetect
      extend ActiveSupport::Concern
      include Api::V1::DeviceDetectorHelper

      included do
        prepend_before_action :detect_device, if: -> { action_required? }
      end

      private

      def action_required?
        # Check if authentication is required for this action
        self.class.requires_action?(action_name)
      end

      def detect_device
        @rq_device_info = load_device request.params[:user_agent]
      end

      module ClassMethods
        def requires_action?(action_name)
          @required_actions ||= []
          @required_actions.include?(action_name.to_sym)
        end

        def requires_action(*actions)
          @required_actions ||= []
          @required_actions.concat(actions.map(&:to_sym))
        end
      end
    end
  end
end