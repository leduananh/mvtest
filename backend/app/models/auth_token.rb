class AuthToken < ApplicationRecord
  belongs_to :user
  belongs_to :device

  enum token_type: { ACCESS: 'ACCESS', REFRESH: 'REFRESH' }

  enum status: { ACTIVE: 'ACTIVE', DEACTIVE: 'DEACTIVE' }

  validates :status, inclusion: { in: %w(ACTIVE DEACTIVE) }

  validates :token_type, inclusion: { in: %w(ACCESS REFRESH) }

  scope :by_jti_and_fingerprint, ->(jti, fingerprint) {
    joins(:device).where(jti: jti, devices: { fingerprint: fingerprint })
  }

  def self.upsert_tokens_by_user_and_device(user_id, device_id)
    auth_tokens = where(user_id: user_id, device_id: device_id)
    access_token = nil
    refresh_token = nil
    if auth_tokens.any?
      auth_tokens.each do |auth_token|
        if auth_token[:token_type] === "ACCESS"
          auth_token.update_access_token
          access_token = auth_token[:token]
        end

        if auth_token[:token_type] === "REFRESH"
          auth_token.update_refresh_token
          refresh_token = auth_token[:token]
        end
      end
    else
      access_token = create_access_token_record(user_id, device_id)[:token]
      refresh_token = create_refresh_token_record(user_id, device_id)[:token]
    end

    {
      access_token: access_token,
      refresh_token: refresh_token
    }
  end

  def self.create_access_token_record(user_id, device_id)
    jwt_hash = JwtService.generate_access_token(user_id)
    AuthToken.create({
                       user_id: user_id, # Replace 1 with the actual user ID
                       device_id: device_id, # Replace 1 with the actual device ID
                       token: jwt_hash[:token],
                       token_type: :ACCESS,
                       expires_at: jwt_hash[:exp], # Example: expires in 1 day
                       status: :ACTIVE, # Example: initial status
                       jti: jwt_hash[:jti] # Replace with a unique value
                     })
  end

  def self.create_refresh_token_record(user_id, device_id)
    jwt_hash = JwtService.generate_refresh_token(user_id)
    AuthToken.create({
                       user_id: user_id, # Replace 1 with the actual user ID
                       device_id: device_id, # Replace 1 with the actual device ID
                       token: jwt_hash[:token],
                       token_type: :REFRESH,
                       expires_at: jwt_hash[:exp], # Example: expires in 1 day
                       status: :ACTIVE, # Example: initial status
                       jti: jwt_hash[:jti] # Replace with a unique value
                     })
  end

  def update_access_token
    token_hash = JwtService.generate_access_token(user[:id])
    update(token: token_hash[:token], jti: token_hash[:jti], expires_at: token_hash[:exp])
  end

  def update_refresh_token
    token_hash = JwtService.generate_refresh_token(user[:id])
    update(token: token_hash[:token], jti: token_hash[:jti], expires_at: token_hash[:exp])
  end
end
