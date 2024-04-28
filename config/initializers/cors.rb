# frozen_string_literal: true

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:5173'  # Update this with the origin of your React app

    # Allow WebSocket connections for Action Cable
    resource '*',
             headers: :any,
             methods: [:get, :post, :put, :patch, :delete, :options, :head],
             expose: ['Authorization'],
             credentials: false,
             max_age: 0,
             # Allow WebSocket requests
             protocols: ['websocket']
  end
end