export async function getItem() {
     try{
    const res = await fetch('http://127.0.0.1:3000/api/user', { next: { revalidate: 100 } },);
        return res.json()}
        catch (error) {  console.error(error); }

  }
