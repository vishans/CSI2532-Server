const { Client } = require('pg');

exports.createClient = async (req, res)=>{
    const { nas, nom, prenom, adresse } = req.query;

    //console.log(nas, nom, prenom, adresse)
    try{
        const client = new Client()
        client.connect();
       
        const query = `
            INSERT INTO ehotel.client(id, nas, nom, prenom, addresse) 
            VALUES($1, $2, $3, $4, $5);
        `;

        const values = [nas, nas, nom, prenom, adresse]; 
        const result = await client.query(query, values);

        
        res.json({
            status: 'success',
            length: result.rows.length,
            data: result.rows
        })
   }
   catch(err){
    console.log(err)
        res.json({
            status: 'fail',
            message: err.name + ": " +err.message
        })
   }
}

exports.verify = async (req, res) => {
    const { nas } = req.query;
    try {
        const client = new Client();
        client.connect();

        const clientQuery = `
            SELECT nas FROM ehotel.client WHERE nas = $1;
        `;
        const value = [nas];
        const clientResult = await client.query(clientQuery, value);

        const employeeQuery = `
            SELECT nas FROM ehotel.employe WHERE nas = $1;
        `;

        const employeeResult = await client.query(employeeQuery, value);

        if (clientResult.rows.length > 0) {
            res.json({ status: "success", belongs: "client" });
        } else if (employeeResult.rows.length > 0) {
            res.json({ status: "success", belongs: "employee" });
        } else {
            res.json({ status: "success", belongs: "none" });
        }
    } catch (err) {
        console.log(err);
        res.json({
            status: "fail",
            message: err.name + ": " + err.message,
        });
    }
};