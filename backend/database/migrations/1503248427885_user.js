"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
    up() {
        this.create("users", (table) => {
            table.increments();
            table.string("exhibitionName").notNullable();
            table.string("handle", 80).notNullable().unique();
            table.string("email", 254).notNullable().unique();
            table.string("salt", 256);
            table.string("password", 256).notNullable();
            table.string("bio")
            table.string("placeOfBirth");
            table.string("banner");
            table.string("profilePicture");
            table.timestamps();
        });
    }

    down() {
        this.drop("users");
    }
}

module.exports = UserSchema;
