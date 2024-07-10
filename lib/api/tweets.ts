export const listTweets = async () => {
    const url = "http://localhost:3000/tweet";
    const authToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklkIjoxMX0.CBWkcbgujot6GxltIaIQluOkzVS-MJcnm5RsbJG3f5U';
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });
    if (res.status != 200){
        throw new Error("Error fetching the api");
    }
    return await res.json();
}