module DeviceDetect
  extend ActiveSupport::Concern
  included DeviceDetectorHelper

  included do
    before_action :detect_device, if: -> { action_required? }
  end

  private

  def action_required?
    # Check if authentication is required for this action
    self.class.requires_action?(action_name)
  end

  def detect_device
    load_device request.params[:user_agent]
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