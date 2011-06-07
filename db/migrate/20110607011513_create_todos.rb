class CreateTodos < ActiveRecord::Migration
  def self.up
    create_table :todos do |t|
      t.string :title
      t.boolean :is_done

      t.timestamps
    end
  end

  def self.down
    drop_table :todos
  end
end
