# app/services/device_detector_service.rb
class DeviceDetectorService
  def initialize(user_agent, request_headers = nil)
    @user_agent = user_agent
    @request_headers = request_headers
  end

  def detect_device
    client = DeviceDetector.new(@user_agent)

    {
      name: client.name,
      full_version: client.full_version,
      os_name: client.os_name,
      os_full_version: client.os_full_version,
      device_type: client.device_type || 'cli',
      device_brand: client.device_brand,
      device_name: client.device_name,
      remote_ip: @request_headers&.remote_ip
    }
  end

  def generate_device_finger_print(device_info)
    Digest::SHA256.hexdigest(device_info.to_s)
  end

end
