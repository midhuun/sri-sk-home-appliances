export async function getItem() {
     try{
    const res = await fetch('https://sk-home-appliancess.vercel.app/api/user', { next: { revalidate: 100 } },);
        return res.json()}
        catch (error) {  console.error(error); }

  }
