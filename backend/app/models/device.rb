class Device < ApplicationRecord
  belongs_to :user
  has_many :auth_tokens

  def self.find_by_finger_print(finger_print)
    find_by(finger_print: finger_print)
  end
end
