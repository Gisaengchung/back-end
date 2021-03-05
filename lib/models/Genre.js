const pool = require('../utils/pool');

module.exports = class Genre {
  genreId;
  genreName;

  constructor(row){
    this.genreId = String(row.genre_id);
    this.genreName = row.genre_name;
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM genres'
    );

    return rows.map(row => new Genre(row));
  }

};
