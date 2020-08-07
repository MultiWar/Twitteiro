"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PostSchema extends Schema {
    up() {
        this.create("tweets", (table) => {
            table.increments();
            table.integer("user_id").unsigned().references("id").inTable("users").onDelete('CASCADE').onUpdate('CASCADE');
            table.string("body").notNullable();
            table.string("anexedUrl");
            table.timestamps();
        });
    }

    down() {
        this.drop("tweets");
    }
}

module.exports = PostSchema;
