class DeviceInfo
  attr_reader :full_version, :os_name, :os_full_version, :device_type, :device_brand, :device_name, :remote_ip

  def initialize(name:, full_version:, os_name:, os_full_version:, device_type:, device_brand:, device_name:, remote_ip:)
    @name = name
    @full_version = full_version
    @os_name = os_name
    @os_full_version = os_full_version
    @device_type = device_type
    @device_brand = device_brand
    @device_name = device_name
    @remote_ip = remote_ip
  end

  def to_s
    [@name, @full_version, @os_name, @os_full_version, @device_type, @device_brand, @device_name, @remote_ip].compact.join(":")
  end
end
