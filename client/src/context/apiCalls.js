import axios from 'axios'

const BASE_URL = 'http://localhost:3001/api'

export const registerUser = async (data) => {
	try {
		const res = await axios.post(`${BASE_URL}/user/register`, data)
		return res.data
	} catch (error) {
		throw error
	}
}
