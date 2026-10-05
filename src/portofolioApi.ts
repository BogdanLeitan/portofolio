export async function portofolioApi() {
    try {
        const request = await fetch("http://localhost:8080/api/holdings");
        
        if(!request.ok) {
            throw new Error("Somthing went wrong!");
        }

        const response = await request.json();
        return response;

    } catch (e) {
        console.log("the URL is incorect!");
        throw e;
    }
}