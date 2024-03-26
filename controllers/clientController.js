const { Client } = require('pg');

exports.getRooms = async (req, res)=>{
    const { date_debut, date_fin, capacite, categorie, nombre_chambre, prix_minimum, prix_maximum } = req.query;

    
    // console.log(date_debut, date_fin, capacite, categorie, nombre_chambre, prix_minimum, prix_maximum);
  
    try{
        const client = new Client()
        client.connect()
       
        const query = `
            SELECT * FROM ehotel.chambre 
            WHERE id NOT IN 
                (
                SELECT chambre_id FROM ehotel.reservation 
                WHERE start_date >= $1 AND end_date <= $2
                )
                AND capacite = $3 AND prix between $4 and $5
                AND fid IN
                (
                 SELECT id FROM ehotel.hotel WHERE nombre_chambre = $6 AND classification = $7
                )
            `

        const values = [date_debut, date_fin, capacite, prix_minimum, prix_maximum, nombre_chambre, categorie];

        const rooms = await client.query(query, values);

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

exports.getBookings = async (req, res) => {
    const { nas } = req.query;

    try {
        const client = new Client();
        client.connect();

        const query = `
            SELECT * FROM ehotel.reservation
            WHERE client_id = $1 AND status = 'Réservé';
        `;
        const values = [nas];
        const bookings = await client.query(query, values);
        res.json({
            status: 'success',
            length: bookings.rows.length,
            data: bookings.rows
        });
    } catch (err) {
        console.log(err);
        res.json({
            status: 'fail',
            message: err.name + ": " + err.message
        });
    }
}