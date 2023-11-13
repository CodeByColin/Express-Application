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

app.use(express.static('public'))

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

  app.post('/api/:resource', async (req, res) => {
    const resource = req.params.resource;
    const data = req.body;
  
    try {
      let query;
      let result;
  
      if (resource === 'members') {
        query = 'INSERT INTO members (firstname, lastname, membership) VALUES ($1, $2, $3) RETURNING *';
        result = await pool.query(query, [data.firstname, data.lastname, data.membership]);
      } else if (resource === 'books') {
        query = 'INSERT INTO books (title, author, genre, available) VALUES ($1, $2, $3, $4) RETURNING *';
        result = await pool.query(query, [data.title, data.author, data.genre, data.available]);
      } else {
        res.status(404).send('Invalid Entry');
        return;
      }
  
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });

  app.put('/api/:resource/:id', async (req, res) => {
    const resource = req.params.resource;
    const data = req.body;
    const id = req.params.id;

    try {
        let query;
        let result;

        if (resource === 'members') {
            query = 'UPDATE members SET firstname = $1, lastname = $2, membership = $3 WHERE id = $4 RETURNING *'
            result = await pool.query(query, [data.firstname, data.lastname, data.membership, id])
        } else if (resource ==='books') {
            query = 'UPDATE books SET title = $1, author = $2, genre = $3, available = $4 WHERE id = $5 RETURNING *'
            result = await pool.query(query, [data.title, data.author, data.genre, data.available, id]);
        }else{
            res.status(404).send('Not Found');
            return;
        }

        if (result.rows.length === 0) {
            res.status(404).send('Not Found');
            return;
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).send('Server Error')
    }
  })

  app.delete('/api/:resource/:id', async (req, res) => {
    const resource = req.params.resource;
    const id = req.params.id;

    try {
        let query;
        let result;

        if(resource === 'members') {
            query = 'DELETE FROM members WHERE id = $1 RETURNING *'
            result = await pool.query(query, [id]);
        }else if (resource === 'books') {
            query = 'DELETE FROM books WHERE id = $1 RETURNING *'
            result = await pool.query(query, [id]);
        } else {
            res.status(404).send('Not Found')
            return;
        }

        if (result.rows.length === 0) {
            res.status(404).send('Not Found')
            return;
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).send('Server Error')
    }
  })


app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
})