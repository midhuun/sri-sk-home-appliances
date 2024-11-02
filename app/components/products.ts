export async function getItem() {
     try{
    const res = await fetch('https://sri-sk-home-appliances.vercel.app/api/user', { next: { revalidate: 100 } });
        return res.json()}
        catch (error) {  console.error(error); }

  }
