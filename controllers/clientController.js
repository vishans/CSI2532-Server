const { Client } = require('pg');

exports.getRooms = async (req, res)=>{
    const { date_debut, date_fin, capacite, categorie, nombre_chambre, prix_minimum, prix_maximum } = req.query;

    // Example: You can now use these variables to filter your data accordingly
    console.log(date_debut, date_fin, capacite, categorie, nombre_chambre, prix_minimum, prix_maximum);
  
    try{
        const client = new Client()
        client.connect()
       
        const query = `
        SELECT * FROM ehotel.chambre 
        WHERE id NOT IN 
            (
                SELECT chambre_id FROM ehotel.reservation 
                WHERE start_date >= '${date_debut}' AND end_date <= '${date_fin}'
            )
            AND capacite = ${capacite} AND prix between ${prix_minimum} and ${prix_maximum}
            AND fid IN
            (
             SELECT id FROM ehotel.hotel WHERE nombre_chambre = ${nombre_chambre} AND classification = ${categorie}
            )
        `


        // const rooms = await client.query(`SELECT * FROM ehotel.hotel 
        // ORDER BY id ASC `)
        const rooms = await client.query(query)

        res.json({
            status: 'success',
            length: rooms.rows.length,
            data: rooms.rows
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