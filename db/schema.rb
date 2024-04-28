# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_04_28_121024) do
  create_table "auth_tokens", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "device_id", null: false
    t.string "token"
    t.string "token_type"
    t.datetime "expires_at"
    t.string "status"
    t.string "jti", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["device_id"], name: "index_auth_tokens_on_device_id"
    t.index ["jti"], name: "index_auth_tokens_on_jti", unique: true
    t.index ["user_id"], name: "index_auth_tokens_on_user_id"
  end

  create_table "devices", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "finger_print"
    t.string "device_type"
    t.datetime "registration_date"
    t.datetime "last_login_date"
    t.index ["user_id"], name: "index_devices_on_user_id"
  end

  create_table "shared_videos", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "youtube_url"
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_shared_videos_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "auth_tokens", "devices"
  add_foreign_key "auth_tokens", "users"
  add_foreign_key "devices", "users"
  add_foreign_key "shared_videos", "users"
end
