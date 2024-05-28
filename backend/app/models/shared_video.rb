class SharedVideo < ApplicationRecord
  include SaveWithRescue
  belongs_to :user

  validates :video_id, presence: true, uniqueness: true
  validates :title, presence: true
  validates :description, presence: true
  validate :unique_video_per_user

  private
  def unique_video_per_user
    if SharedVideo.exists?(video_id: video_id, user_id: user_id)
      by_user_msg = user_id == user.id ? "you" : user.email
      errors.add(:video_id, "has already been shared by #{by_user_msg}")
    end
  end

end
