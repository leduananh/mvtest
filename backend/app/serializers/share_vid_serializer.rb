class ShareVidSerializer < BaseSerializer
  attributes :video_id, :description, :title, :shared_by

  def shared_by
    object.user.email
  end
end
