const pool = require('../utils/pool');

module.exports = class User {
  userId;
  email;
  passwordHash;
  firstName; 
  lastName; 
  tagline; 
  userRole; 
  profileImageUrl; 
  paymentHandle; 
  userState; 
  userCity; 

  constructor(row){
    this.userId = String(row.id);
    this.email = row.email;
    this.passwordHash = row.password_hash;
    this.firstName = row.first_name; 
    this.lastName = row.last_name; 
    this.tagline = row.tagline; 
    this.userRole = row.user_role; 
    this.profileImageUrl = row.profile_image_url; 
    this.paymentHandle = row.payment_handle; 
    this.userState = row.user_state; 
    this.userCity = row.user_city; 
  }

  static async insert({ 
    email, 
    passwordHash, 
    firstName, 
    lastName, 
    tagline, 
    userRole, 
    profileImageUrl = 'https://res.cloudinary.com/gisaengchung/image/upload/v1615315671/default/sa5rhldqbnnpubcjt6d7.png', 
    paymentHandle,
    userState, 
    userCity  
  }) {
    const { rows } = await pool.query(
      `INSERT INTO users 
        (email, 
        password_hash, 
        first_name, 
        last_name, 
        tagline, 
        user_role, 
        profile_image_url, 
        payment_handle, 
        user_state, 
        user_city) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        email, 
        passwordHash, 
        firstName, 
        lastName, 
        tagline, 
        userRole, 
        profileImageUrl, 
        paymentHandle, 
        userState, 
        userCity 
      ]
    );
    return new User(rows[0]);
  }

  static async findByEmail(email) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE email=$1',
      [email]
    );

    if(!rows[0]) throw new Error(`No user with email ${email} found.`);
    return new User(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE id=$1',
      [id]
    );

    if(!rows[0]) throw new Error(`No user with id ${id} found.`);
    return new User(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM users ORDER BY last_name'
    );

    return rows.map(row => new User(row));
  }

  static async replaceById({
    userId,
    email, 
    firstName, 
    lastName, 
    tagline, 
    userRole, 
    profileImageUrl, 
    paymentHandle, 
    userState, 
    userCity
  }) {
    const { rows } = await pool.query(
      `UPDATE users 
        SET 
        email = $1, 
        first_name = $2, 
        last_name = $3, 
        tagline = $4, 
        user_role = $5, 
        profile_image_url = $6, 
        payment_handle = $7, 
        user_state = $8, 
        user_city = $9
        WHERE id=$10 RETURNING *`,
      [    
        email, 
        firstName, 
        lastName, 
        tagline, 
        userRole, 
        profileImageUrl, 
        paymentHandle, 
        userState, 
        userCity,
        userId
      ]
    );

    if(!rows[0]) throw new Error(`No user with id ${userId} found.`);
    return new User(rows[0]);
  }

  toJSON() {
    const json = { ...this };
    delete json.passwordHash;
    return json;
  }
};
