"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PostSchema extends Schema {
    up() {
        this.create("tweets", (table) => {
            table.increments();
            table
                .integer("user_id")
                .unsigned()
                .references("id")
                .inTable("users")
                .onDelete("CASCADE")
                .onUpdate("CASCADE");
            table.integer("respondedId");
            table.string("body").notNullable();
            table.boolean("isRetweet").defaultTo(false);
            table.boolean("hasCommentary").defaultTo(false);
            table.string("anexedUrl");
            table.integer("totalOfLikes").defaultTo(0);
            table.timestamps();
        });
    }

    down() {
        this.drop("tweets");
    }
}

module.exports = PostSchema;
