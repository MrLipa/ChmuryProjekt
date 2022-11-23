const pool = require("../model/db");


const getUser = async (req, res) => {
    try {
        const Todo = await pool.query("SELECT * FROM projekt.register WHERE email=$1",[req.params.email]);

        if(Todo.rows)
        {
          res.json(Todo.rows);
        }

    } catch (err) {
        res.status(400).json(err.message);
    }
}

const getAllUsers =  async (req, res) => {
    try {
        const Todo = await pool.query("SELECT * FROM projekt.register");
        if(Todo.rows)
        {
          res.json(Todo.rows);
        }
    } catch (err) {
        res.status(400).json(err.message);
    }
}

const createNewUser = async (req, res) => {
    try {
        const { firstName,lastName,email,password } = req.body;

        if (!firstName || !lastName || !email || !password)  {
            return res.status(400).json({ 'message': 'First, last names,email and password are required.' });
        }

        const newTodo = await pool.query(
            "INSERT INTO projekt.register (firstName,lastName,email,password) VALUES($1,$2,$3,$4) RETURNING *",
            [firstName,lastName,email,password]
        );

        res.status(201).json(newTodo.rows);
    }catch (err) {
        res.status(400).json(err.message);
    }
}

const updateUser = async (req, res) => {
    try {
        const email = req.params.email
        const user = req.body;

        if (!user.firstName || !user.lastName || !user.indexNumber || !user.email || !user.password)  {
            return res.status(400).json({ 'message': 'First, last names,email and password are required.' });
        }

        const newTodo = await pool.query(
            "UPDATE projekt.register SET firstName = $1, lastName= $2, email=$3, password=$4 WHERE email = $4 RETURNING *",
            [user.firstName,user.lastName,user.email,user.password]
        );
        
        res.status(201).json(newTodo.rows);
    }catch (err) {
        res.status(400).json(err.message);
    }
}

const deleteUser = (req, res) => {
    try {
        const email = req.params.email

        pool.query("DELETE FROM projekt.register WHERE email=$1",[email], function (err, result) {
            if (err) 
                throw err;
            res.status(201).json("Number of records deleted: " + result.affectedRows);
        });

    }catch (err) {
        res.status(400).json(err.message);
    }
}

module.exports = {
    getUser,
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}