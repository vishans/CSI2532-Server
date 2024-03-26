const { Client } = require('pg');

function generateRandomNDigitNumber(n) {
    if(n < 1) {
      return '0'; // return '0' if the requested digit count is less than 1
    }
   
    const min = Math.pow(10, n - 1);
    const max = Math.pow(10, n);
   
    const randomNumber = Math.floor(Math.random() * (max - min) + min);
    return randomNumber.toString();
  }

exports.bookRoom = async (req, res) => {
    const { nas, chambre_id, date_debut, date_fin, status } = req.query;

    try {
        const client = new Client();
        client.connect();

        const randomBookingID = generateRandomNDigitNumber(9);

        const query = `
            INSERT INTO ehotel.reservation (id, client_id, chambre_id, start_date, end_date, status)
            VALUES (${randomBookingID},$1, $2, $3, $4, $5);
            
        `;

        const values = [nas, chambre_id, date_debut, date_fin, status];

        const reservation = await client.query(query, values);

        res.json({
            status: 'success',
            data: {bookingID: randomBookingID}
        });

    } catch (err) {
        console.log(err);
        res.json({
            status: 'fail',
            message: err.name + ": " + err.message
        });
    }
}
