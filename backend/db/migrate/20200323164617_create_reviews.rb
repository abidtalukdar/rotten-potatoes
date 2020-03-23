class CreateReviews < ActiveRecord::Migration[6.0]
  def change
    create_table :reviews do |t|
      t.belongs_to :movie, null: false, foreign_key: true
      t.float :rating
      t.text :review
      t.string :reviewer

      t.timestamps
    end
  end
end
