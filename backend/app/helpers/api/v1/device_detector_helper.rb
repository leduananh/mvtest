module Api
  module V1
    module DeviceDetectorHelper
      def load_device(user_agent)
        svc = DeviceDetectorService.new(user_agent)
        device_info = svc.detect_device
        device_finger_print = svc.generate_device_finger_print(device_info)
        existing_device = Device.find_by_finger_print(device_finger_print)

        {
          existing_device: existing_device,
          device_finger_print: device_finger_print,
          info: device_info
        }
      end
    end
  end
end
