exports.up = function (knex) {
  return knex.schema
    .createTable("productData", (table) => {
      table.increments(); // Creates an id
      table.string("productName");
      table.string("productSKU");
      table.string("productURL");
      table.timestamp("createdAt").defaultTo(knex.fn.now());
    })
    .createTable("productPriceData", (table) => {
      table.increments(); // Creates an id
      table
        .integer("productID")
        .unsigned()
        .references("id")
        .inTable("productData")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.integer("productPrice", 10000);
      table.timestamp("createdAt");
    })
    .createTable("storedDesiredPrices", (table) => {
      table.increments();
      table.string("email");
      table.integer("desiredPrice");
      table
        .integer("productID")
        .unsigned()
        .references("id")
        .inTable("productData")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.timestamp("createdAt");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("productData")
    .dropTableIfExists("productPriceData")
    .dropTableIfExists("storedDesiredPrices");
};
