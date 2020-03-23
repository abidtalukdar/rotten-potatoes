class CreateMovies < ActiveRecord::Migration[6.0]
  def change
    create_table :movies do |t|
      t.string :name
      t.string :film_rating
      t.string :genre
      t.string :director
      t.string :year_released
      t.text :synopsis
      t.string :image_url

      t.timestamps
    end
  end
end
