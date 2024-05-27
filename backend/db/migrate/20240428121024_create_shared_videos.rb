class CreateSharedVideos < ActiveRecord::Migration[7.1]
  def change
    create_table :shared_videos do |t|
      t.references :user, null: false, foreign_key: true
      t.string :videoId
      t.string :title
      t.string :description

      t.timestamps
    end
  end
end
