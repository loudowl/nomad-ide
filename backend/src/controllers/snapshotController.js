const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

exports.createSnapshot = async (req, res) => {
  const { snapshotData } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO snapshots (data) VALUES ($1) RETURNING id',
      [snapshotData]
    );
    res.status(201).json({ snapshotId: result.rows[0].id });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getSnapshot = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT data FROM snapshots WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.status(200).json({ snapshotData: result.rows[0].data });
    } else {
      res.status(404).json({ message: 'Snapshot not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
