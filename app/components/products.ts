export async function getItem() {
     try{
    const res = await fetch('https://sri-sk-home-appliances-2.vercel.app/api/user', { next: { revalidate: 100 } },);
        return res.json()}
        catch (error) {  console.error(error); }

  }
