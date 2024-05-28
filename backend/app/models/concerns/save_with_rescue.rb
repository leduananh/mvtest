# app/models/concerns/save_with_rescue.rb
module SaveWithRescue
  extend ActiveSupport::Concern

  included do
    def save_with_rescue
      save
    rescue ActiveRecord::RecordInvalid => e
      raise Errors::ModelInvalidError, e.message
    rescue ActiveRecord::RecordNotUnique => e
      columns = extract_columns_from_error(e.message)
      raise Errors::ModelConstraintError, "#{columns.join(', ')}"
    rescue ActiveRecord::StatementInvalid => e
      raise Errors::DatabaseError
    end

    def save_with_rescue!
      begin
        save!
      rescue ActiveRecord::RecordInvalid => e
        raise Errors::ModelInvalidError, e.message
      rescue ActiveRecord::RecordNotUnique => e
        columns = extract_columns_from_error(e.message)
        raise Errors::ModelConstraintError, "#{columns.join(', ')}"
      rescue ActiveRecord::StatementInvalid => e
        raise Errors::DatabaseError
      end
    end

    def update_with_rescue(attributes = {})
      update(attributes)
    rescue ActiveRecord::RecordInvalid => e
      raise Errors::ModelInvalidError, e.message
    rescue ActiveRecord::RecordNotUnique => e
      columns = extract_columns_from_error(e.message)
      raise Errors::ModelConstraintError, "#{columns.join(', ')}"
    rescue ActiveRecord::StatementInvalid => e
      raise Errors::DatabaseError
    end

    def update_with_rescue!(attributes = {})
      update!(attributes)
    rescue ActiveRecord::RecordInvalid => e
      raise Errors::ModelInvalidError, e.message
    rescue ActiveRecord::RecordNotUnique => e
      columns = extract_columns_from_error(e.message)
      raise Errors::ModelConstraintError, "#{columns.join(', ')}"
    rescue ActiveRecord::StatementInvalid => e
      raise Errors::DatabaseError
    end
  end

  class_methods do
    def save_with_rescue(attributes = {})
      new(attributes).tap do |record|
        record.save_with_rescue
      end
    end

    def save_with_rescue!(attributes = {})
      new(attributes).tap do |record|
        record.save_with_rescue!
      end
    end
  end

  private

  def extract_columns_from_error(error_message)
    if (match = error_message.match(/UNIQUE constraint failed: (.+)/))
      columns = match[1].split(',').map do |column|
        column.strip.split('.').last # Get the column name part
      end
      columns
    else
      ['unknown']
    end
  end
end
