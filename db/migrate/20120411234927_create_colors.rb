class CreateColors < ActiveRecord::Migration
  def change
    create_table :colors do |t|
      t.string :name
      t.string :value
      t.integer :likes
      t.timestamps
    end
  end
end
