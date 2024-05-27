require_relative '../../concerns/api/v1/auth/authen.rb'
require 'digest'

class Api::V1::SharedVideosController < ApplicationController
  include Api::V1::Authen
  after_action :broadcast_notification, only: [:create]

  requires_authentication_for :create

  def create
    video_id = VideoSharingService.extract_validate_video_id(video_params[:youtube_url])

    video_details = VideoSharingService.fetch_video_details(video_id)

    @video = SharedVideo.new(video_details)

    if @video
      # if @video.save
      render json: @video, status: :created
    else
      render json: @video.errors, status: :unprocessable_entity
    end
  end

  private

  def video_params
    params.require(:video).permit(:youtube_url)
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
