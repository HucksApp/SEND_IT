import pg  from  'pg'; 
    const Pool = pg.Pool;
  const pool = new Pool({
    user:"Ahrabprince",
    host:"localhost",
    database:"hucks",
    password:"pussypie",
    port:5432
});

 const client = pool;
export { client  };
