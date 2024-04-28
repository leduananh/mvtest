class Api::V1::SharedVideosController < ApplicationController
  after_action :broadcast_notification, only: [:create]

  def create
    @video = {
      email: "tester",
      title: "phim hay nhat"
    }

    # @video = Video.new(video_params)
    if @video
      # if @video.save
      render json: @video, status: :created
    else
      render json: @video.errors, status: :unprocessable_entity
    end
  end

  private

  def video_params
    params.require(:video).permit(:title, :youtube_url)
  end

  def broadcast_notification
    # if @video.persisted?
    if @video
      msg = { title: "User #{@video[:email]} had new video shared: #{@video[:title]}",
              body: "Check it out now!"
      }

      NotificationBroadcastJob.perform_later msg
    end
  end
end
