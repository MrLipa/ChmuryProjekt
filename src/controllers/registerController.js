const bcrypt = require('bcrypt');
const pool = require("../model/db");

const handleNewUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) 
        return res.status(400).json({ 'message': 'First, last names, email and password are required.' });

    const duplicate = await pool.query("SELECT * FROM projekt.register WHERE email=$1",[email]);
    
    if (duplicate.rowCount!=0) return res.sendStatus(409);

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newTodo = await pool.query(
            "INSERT INTO projekt.register (firstName,lastName,email,password) VALUES($1,$2,$3,$4) RETURNING *",
            [firstName,lastName,email,hashedPassword]
        );

        res.status(201).json({ 'success': `New user ${email} created!` });
    }catch (err) {
        res.status(500).json(err.message);
    } 
}

module.exports = { handleNewUser };