const pool = require('../utils/pool');

module.exports = class State {
  stateId;
  stateCode;
  stateName;

  constructor(row){
    this.stateId = String(row.state_id);
    this.stateCode = row.state_code;
    this.stateName = row.state_name;
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM states'
    );

    return rows.map(row => new State(row));
  }

};
