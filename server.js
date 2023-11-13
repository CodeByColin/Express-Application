import express from 'express';

import pg from 'pg';

const {Pool} = pg;

const app = express();

const PORT = 3000;

const pool = new Pool({
    user: 'colin',
    host: 'localhost',
    database: 'bookstore',
    password: '',
    port: 5432,
});

app.use(express.json());

app.get('/api/:resource/:id?', async (req, res) => {
    const resource = req.params.resource;
    const id = req.params.id;
  
    try {
      let query;
      let result;
  
      if (resource === 'members') {
        query = id ? 'SELECT * FROM members WHERE id = $1' : 'SELECT * FROM members';
        result = await pool.query(query, id ? [id] : []);
      } else if (resource === 'books') {
        query = id ? 'SELECT * FROM books WHERE id = $1' : 'SELECT * FROM books';
        result = await pool.query(query, id ? [id] : []);
      } else {
        res.status(404).send('Not Found');
        return;
      }
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });
  



app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
})