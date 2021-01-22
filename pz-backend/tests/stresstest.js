import http from "k6/http";
export default function () {
	var url = "http://localhost:4000/login";
	var payload = JSON.stringify({
		number: 8684876466,
		password: 1,
	});
	var params = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	http.post(url, payload, params);
}
