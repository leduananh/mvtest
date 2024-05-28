Dir[Rails.root.join('lib/errors/*.rb')].sort.each { |file| require file }
Dir[Rails.root.join('app/helpers/api/v1/*.rb')].sort.each { |file| require file }
Dir[Rails.root.join('app/models/concerns/*.rb')].sort.each { |file| require file }
Dir[Rails.root.join('app/controllers/concerns/api/v1/**/*.rb')].sort.each { |file| require file }
Dir[Rails.root.join('app/serializers/*.rb')].sort.each { |file| require file }
