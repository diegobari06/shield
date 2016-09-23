class Company < ActiveRecord::Base
  validates :name,:uniqueness => true
  has_many :residents
  has_many :vehicules
  has_many :houses
  has_many :users
end
