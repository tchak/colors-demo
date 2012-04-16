module FilterSupport
  extend ActiveSupport::Concern

  OPERATORS = {
    '$eq' => '=',
    '$ne' => '!=',
    '$gt' => '>',
    '$lt' => '<',
    '$gte' => '>=',
    '$lte' => '>='
  }

  module ClassMethods

    def filter(params)
      criteria = []
      criteria_values = []
      params.each do |key, criterias|
        next unless self.attribute_names.include?(key)

        if criterias.is_a?(Hash)
          criterias.each do |operator, value|
            next unless OPERATORS.has_key?(operator)

            criteria << "#{key} #{OPERATORS[operator]} ?"
            criteria_values << value
          end
        else
          criteria << "#{key} = ?"
          criteria_values << criterias
        end
      end

      if criteria.empty?
        self
      else
        self.where(criteria.join(' AND '), *criteria_values)
      end
    end
  end

end
