const url = "http://172.20.10.2:8000/";


async function getAllpizzas() {
    try {
        response = await fetch(url+"pizzas");
        data = await response.json();
        return data;
    } catch (error) {
        console.log("error: ",error);
    }
}