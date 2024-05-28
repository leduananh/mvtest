class Api::V1::SharedVideosController < ApplicationController
  include Api::V1::Authen
  include Api::V1::DeviceDetect
  after_action :broadcast_notification, only: [:create]

  requires_action :create, :index, :destroy
  requires_authentication_for :create

  respond_to :json

  def index
      videos = SharedVideo.page(video_params[:page]).per(video_params[:per_page])
      render json: videos,
             each_serializer: ShareVidSerializer,
             paginate: pagination_meta(videos)

  end

  def create
    video_id = VideoSharingService.extract_validate_video_id(share_video_params[:youtube_url])

    video_details = VideoSharingService.fetch_video_details(video_id)

    @video = @current_user.share_video(video_details)

    if @video.persisted?
      render json: @video, status: :created
    else
      render json: @video.errors, status: :unprocessable_entity
    end
  end

  private

  def share_video_params
    params.require(:video).permit(:youtube_url)
  end

  def video_params
    params.permit(:page, :per_page)
  end

  def broadcast_notification
    if @video.persisted?
      msg = { title: "User #{@video[:email]} had new video shared: #{@video[:title]}",
              body: "Check it out now!"
      }

      NotificationBroadcastJob.perform_later msg
    end
  end
end
