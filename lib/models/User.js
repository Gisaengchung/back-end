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
    profileImageUrl = 'https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/egg-3442-e1f6463624338504cd021bf23aef8441@1x.jpg', 
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

  toJSON() {
    const json = { ...this };
    delete json.passwordHash;
    return json;
  }
};
