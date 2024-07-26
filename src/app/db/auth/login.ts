import conn from '../connect';

export const login = {
    authenticate
};

async function authenticate( username:string ) {
    try {
        const query = `select * from users where email = '${username}'`;
        const [results]:any = await conn.promise().query(query);
       
        return results;
      } catch (error) {
        return { error };
      }
}

