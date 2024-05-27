class CreateDevices < ActiveRecord::Migration[7.1]
  def change
    create_table :devices do |t|
      t.references :user, null: false, foreign_key: true
      t.string :finger_print
      t.string :device_type
      t.datetime :registration_date
      t.datetime :last_login_date
    end
  end
end
