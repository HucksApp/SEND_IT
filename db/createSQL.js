

export default function createSQL(db){

    db.query(

    `CREATE TABLE IF NOT EXISTS users(
        email VARCHAR(50) NOT NULL UNIQUE,
        phone_number BIGINT NOT NULL,
        username VARCHAR(30) NOT NULL,
        user_password VARCHAR(30) NOT NULL,
        address VARCHAR(50),
        order_counts INT DEFAULT 0,
        PRIMARY KEY(email, phone_number)
    );
    
    `,(err,result)=>{
        if(err){
            console.log(err)
        }else if(result){
            console.log("SQL FOR USER IS VALID !!!")
        }
    });



    db.query(`

            CREATE TABLE IF NOT EXISTS orders(
                user_email VARCHAR(30) NOT NULL,
                order_id INT NOT NULL,
                receiver_name VARCHAR(30) NOT NULL,
                destination_address VARCHAR(80) NOT NULL,
                pickup_address VARCHAR(80) NOT NULL,
                receiver_phone_no BIGINT NOT NULL,
                order_date TIMESTAMP DEFAULT now(),
                c_location VARCHAR(80) DEFAULT 'Storage',
                status VARCHAR(20) DEFAULT 'In transit',
                description VARCHAR(70) DEFAULT 'order description',
                PRIMARY KEY(user_email, order_id),
                FOREIGN KEY(user_email) REFERENCES users(email) ON DELETE CASCADE
            );

            `,(err, result)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log("SQL FOR ORDERS IS VALID !!!")
                }
            })






}