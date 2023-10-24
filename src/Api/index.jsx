import axios from 'axios';
export async function FetchData (money1, money2, conversionRate) {
    const ApiKey = '57703835022b3d6dba0557f3';

    try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${ApiKey}/pair/${money1}/${money2}/${conversionRate}`);
        console.log(response);
        return response.data;
    } catch (error) {
        throw error;
    }
}