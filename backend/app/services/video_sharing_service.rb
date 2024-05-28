class VideoSharingService
  YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3'
  API_KEY = 'AIzaSyBxCiLBBbWYzHMAFIIodvu4f1ah8-Sk4Fg'
  YOUTUBE_URL_REGEX = /
    (?:https?:\/\/)?            # Optional scheme
    (?:www\.)?                  # Optional www
    (?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/|youtube.com\/embed\/)  # Match YouTube URL patterns
    ([a-zA-Z0-9_-]{11})         # Match the video ID
  /x

  API = Faraday.new(url: YOUTUBE_API_URL) do |faraday|
    faraday.request :url_encoded # form-encode POST params
    faraday.response :logger # log requests to STDOUT
    faraday.adapter Faraday.default_adapter # make requests with Net::HTTP
  end

  def self.fetch_video_details(video_id)
    response = API.get('videos') do |req|
      req.params['id'] = video_id
      req.params['part'] = 'snippet'
      req.params['key'] = API_KEY
    end

    data = JSON.parse(response.body)

    if data['items'].any?
      video_details = {
        video_id: video_id,
        description: data['items'][0]['snippet']['description'],
        title: data['items'][0]['snippet']['title']
      }

      video_details
    else
      raise Errors::URLSharingError.new(provided_url: url)
    end
  end

  def self.extract_validate_video_id(url)
    match = url.match(YOUTUBE_URL_REGEX)
    unless match
      raise Errors::InvalidURLError.new(provided_url: url)
    end
    match[1]
  end
end
