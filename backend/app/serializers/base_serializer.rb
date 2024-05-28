# app/serializers/base_serializer.rb
class BaseSerializer < ActiveModel::Serializer
  def initialize(object, options = {})
    @pagination_meta = options[:paginate]
    super(object, options)
  end

  def serializable_hash(a,b,c)
    json_hash = { results: super }

    if @pagination_meta.present?
      json_hash[:meta] = @pagination_meta
    end

    json_hash
  end
end
