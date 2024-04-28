class JwtService
  require 'digest'

  # Method to encode the payload with JWT
  def self.encode(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, Rails.application.credentials.secret_key_base)
  end

  # Method to decode the token
  def self.decode(token)
    body = JWT.decode(token, Rails.application.credentials.secret_key_base, true, algorithm: 'HS256')[0]
    HashWithIndifferentAccess.new(body)
  rescue JWT::ExpiredSignature, JWT::VerificationError => e
    raise ExceptionHandler::InvalidToken, e.message
  end

  # Generates a unique JWT ID (jti)
  def self.generate_jti(user_id)
    timestamp = Time.now.to_f.to_s
    raw_jti = "#{user_id}-#{timestamp}-#{rand(1000..9999)}"
    Digest::SHA256.hexdigest(raw_jti)
  end

  # Generates an access token with a default expiration of 24 hours
  def self.generate_access_token(user_id)
    payload = {
      user_id: user_id,
      jti: generate_jti(user_id),
      exp: 24.hours.from_now.to_i # Sets expiration to 24 hours from now
    }
    {
      token: encode(payload),
      exp: payload[:exp],
      jti: payload[:jti]
    }
  end

  # Generates a refresh token with a longer default expiration, e.g., 2 weeks
  def self.generate_refresh_token(user_id)
    payload = {
      user_id: user_id,
      jti: generate_jti(user_id),
      exp: 2.weeks.from_now.to_i # Sets expiration to 2 weeks from now
    }
    {
      token: encode(payload),
      exp: payload[:exp],
      jti: payload[:jti]
    }
  end
end
