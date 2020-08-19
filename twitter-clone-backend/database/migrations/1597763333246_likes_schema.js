"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LikesSchema extends Schema {
    up() {
        this.create("likes", (table) => {
            table.increments()
            table
                .integer("userId")
                .unsigned()
                .references("id")
                .inTable("users")
            table
                .integer('postId')
                .unsigned()
                .references("id")
                .inTable("tweets")
            table.timestamps()
        });
    }

    down() {
        this.drop("likes");
    }
}

module.exports = LikesSchema;
