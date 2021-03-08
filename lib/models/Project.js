const pool = require('../utils/pool');

module.exports = class Project {
  projectId;
  projectTitle;
  projectSubtitle;
  projectDescription;
  projectGenre;
  projectLocState;
  projectLocCity;
  projectMainImage;
  projectFundingGoal;
  projectFundingExDate;
  projectRiskChallenge;
  projectDiversity;
  userId;

  constructor(row){
    this.projectId = String(row.id);
    this.projectTitle = row.title;
    this.projectSubtitle = row.subtitle;
    this.projectDescription = row.description;
    this.projectGenre = row.genre;
    this.projectLocState = row.state;
    this.projectLocCity = row.city;
    this.projectMainImage = row.image_url;
    this.projectFundingGoal = row.funding_goal;
    this.projectFundingExDate = row.funding_ex_date;
    this.projectRiskChallenge = row.risk_challenge;
    this.projectDiversity = row.diversity;
    this.userId = String(row.user_id);
  }

  static async insert({ 
    projectTitle,
    projectSubtitle,
    projectDescription,
    projectGenre,
    projectLocState,
    projectLocCity,
    projectMainImage,
    projectFundingGoal,
    projectFundingExDate,
    projectRiskChallenge,
    projectDiversity,
    userId
  }) {
    const { rows } = await pool.query(
      `INSERT INTO projects 
        (title, 
        subtitle, 
        description, 
        genre, 
        state, 
        city, 
        image_url, 
        funding_goal, 
        funding_ex_date, 
        risk_challenge,
        diversity,
        user_id) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [
        projectTitle,
        projectSubtitle,
        projectDescription,
        projectGenre,
        projectLocState,
        projectLocCity,
        projectMainImage,
        projectFundingGoal,
        projectFundingExDate,
        projectRiskChallenge,
        projectDiversity,
        userId
      ]
    );
    return new Project(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM projects WHERE id=$1',
      [id]
    );

    if(!rows[0]) throw new Error(`No project with id ${id} found.`);
    return new Project(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM projects'
    );

    return rows.map(row => new Project(row));
  }

  static async replaceById({
    projectId,
    projectTitle,
    projectSubtitle,
    projectDescription,
    projectGenre,
    projectLocState,
    projectLocCity,
    projectMainImage,
    projectFundingGoal,
    projectFundingExDate,
    projectRiskChallenge,
    projectDiversity,
    userId
  }) {
    const { rows } = await pool.query(
      `UPDATE projects 
        SET 
        title = $1, 
        subtitle = $2, 
        description = $3, 
        genre = $4, 
        state = $5, 
        city = $6, 
        image_url = $7, 
        funding_goal = $8, 
        funding_ex_date = $9, 
        risk_challenge = $10,
        diversity = $11,
        user_id = $12,
        WHERE id=$13 RETURNING *`,
      [    
        projectTitle,
        projectSubtitle,
        projectDescription,
        projectGenre,
        projectLocState,
        projectLocCity,
        projectMainImage,
        projectFundingGoal,
        projectFundingExDate,
        projectRiskChallenge,
        projectDiversity,
        projectId,
        userId,
        projectId
      ]
    );

    if(!rows[0]) throw new Error(`No project with id ${projectId} found.`);
    return new Project(rows[0]);
  }

};
