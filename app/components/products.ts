export async function getItem() {
    // The `fetch` function is automatically memoized and the result
    // is cached
    const res = await fetch('http://localhost:3000/api/user')
    return res.json()
  }
   