class CreateAuthTokens < ActiveRecord::Migration[7.1]
  def change
    create_table :auth_tokens do |t|
      t.references :user, null: false, foreign_key: true
      t.references :device, null: false, foreign_key: true
      t.string :token
      t.string :token_type
      t.datetime :expires_at
      t.string :status
      t.string :jti, null: false

      t.timestamps
    end

    add_index :auth_tokens, :jti, unique: true
  end
end
