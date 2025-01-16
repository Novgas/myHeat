require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.post("/getDeviceInfo", async (req, res) => {
	const {deviceId} = req.body;
	const requestBody = {
		action: "getDeviceInfo",
		deviceId: deviceId,
		login: process.env.LOGIN,
		key: process.env.KEY,
	};

	try {
		const apiUrl = "https://my.myheat.net/api/request/";
		const apiResponse = await axios.post(apiUrl, requestBody, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		res.json(apiResponse.data);
	} catch (error) {
		res.status(500).json({error: error.message});
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
