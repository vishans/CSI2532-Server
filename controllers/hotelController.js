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