export async function getItem() {
     try{
    const res = await fetch('https://sri-sk-home-appliances.vercel.app/api/user', {cache:'no-store'});
        return res.json()}
        catch (error) {  console.error(error); }

  }
