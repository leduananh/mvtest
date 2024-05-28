class User < ApplicationRecord
  include SaveWithRescue
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :validatable

  has_many :auth_tokens
  has_many :shared_videos

  def find_auth_token_by_jti_and_fingerprint(jti, fingerprint)
    auth_tokens.joins(:device)
               .where(jti: jti, device: { finger_print: fingerprint })
               .first
  end

  def destroy_login_session(device_id)
    auth_tokens.where(device_id: device_id, token_type: ['access', 'refresh']).destroy_all
  end

  def share_video(video_details)
    SharedVideo.save_with_rescue!(
      user: self,
      video_id: video_details[:video_id],
      description: video_details[:description],
      title: video_details[:title]
    )
  end

end
