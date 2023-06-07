const axios = require("axios");

exports.handler = async function (event, context) {
  const targetUrl = "http://159.89.81.211:5000/query";

  try {
    const { data } = await axios({
      method: event.httpMethod,
      url: targetUrl,
      data: JSON.parse(event.body),
    });

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
