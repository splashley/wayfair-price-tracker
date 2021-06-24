// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/hhhdb.sqlite3",
    },
    useNullAsDefault: true,
  },
};
