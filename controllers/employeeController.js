const { Client } = require('pg');

exports.createEmployee = async (req, res)=>{
    const { nas, nom, prenom, adresse, role } = req.query;

    //console.log(nas, nom, prenom, adresse)
    try{
        const client = new Client()
        client.connect();
       
        const query = `
            INSERT INTO ehotel.employe(id, nas, nom, prenom, addresse, role) 
            VALUES($1, $2, $3, $4, $5, $6);
        `;

        const values = [nas, nas, nom, prenom, adresse, role]; 
        const result = await client.query(query, values);

        
        res.json({
            status: 'success',
            message: ''
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