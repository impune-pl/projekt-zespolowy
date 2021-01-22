import request = require("supertest");
import express = require("express");

export async function test(app: express.Express) {
	let agent = request.agent(app);
	let passed = 0;
	let tests = 0;

	console.log("Run GET / test");
	await agent.get("/").expect((res: request.Response) => {
		tests++;
		if (!(res.text.includes("<body>") && res.text.includes("<html>"))) {
			throw new Error("GET / test failed (" + "body:" + res.body + " status:" + res.status + " text:" + res.text + ")");
		} else {
			passed++;
		}
		// console.log({ res });
	});

	console.log("Run POST /login test");
	await agent
		.post("/login")
		.send({
			password: 1,
			number: 3333333363,
		})
		.expect((res: request.Response) => {
			tests++;
			if (res.body.login_successful !== true) {
				throw new Error("POST /login positive test failed (" + "body:" + res.body + " status:" + res.status + " text:" + res.text + ")");
			} else {
				passed++;
			}
			// console.log({ res });
		});

	console.log("Run POST /login test");
	await agent
		.post("/login")
		.send({
			password: 1,
			number: 1000033363,
		})
		.expect((res: request.Response) => {
			tests++;
			if (res.body.login_successful !== false) {
				throw new Error("POST /login negative test failed (" + "body:" + res.body + " status:" + res.status + " text:" + res.text + ")");
			} else {
				passed++;
			}
			// console.log({ res });
		});

	console.log("Run POST /register test");
	await agent
		.post("/register")
		.send({
			password: 1,
			email: "asdeg@pom.pl",
			number: 1000033363,
		})
		.expect((res: request.Response) => {
			tests++;
			if (res.body.register_successful !== true) {
				throw new Error("POST /register positive test failed (" + "body:" + res.body + " status:" + res.status + " text:" + res.text + ")");
			} else {
				passed++;
			}
			// console.log({ res });
		});

	console.log("Run POST /register test");
	await agent
		.post("/register")
		.send({
			password: 1,
			email: "asdeg@pom.pl",
			number: 1000033363,
		})
		.expect((res: request.Response) => {
			tests++;
			if (res.body.register_successful !== false) {
				throw new Error("POST /register negative test failed (" + "body:" + res.body + " status:" + res.status + " text:" + res.text + ")");
			} else {
				passed++;
			}
			// console.log({ res });
		});

	console.log("Run POST /message/send test");
	await agent
		.post("/message/send")
		.send({
			contact_id: 9,
			content: "Umba umba asdasfkr fgverng",
			type: 3,

			password: 1,
			number: 3333333363,
		})
		.expect((res: request.Response) => {
			tests++;
			console.log({ res });
			if (res.body.message_send !== true) {
				throw new Error("POST /message/send positive test failed (" + "body:" + res.body + " status:" + res.status + " text:" + res.text + ")");
			} else {
				passed++;
			}
			// console.log({ res });
		});

	console.log("Run POST /message/send test");
	await agent
		.post("/message/send")
		.send({
			contact_id: 111111111,
			content: "Umba umba asdasfkr fgverng",
			type: 3,

			password: 1,
			number: 3333333363,
		})
		.expect((res: request.Response) => {
			tests++;
			if (res.body.message_send !== false) {
				throw new Error("POST /message/send negative test 1 failed (" + "body:" + res.body + " status:" + res.status + " text:" + res.text + ")");
			} else {
				passed++;
			}
			// console.log({ res });
		});

	console.log("Run POST /message/send test");
	await agent
		.post("/message/send")
		.send({
			contact_id: 11,
			content: "Umba umba asdasfkr fgverng",
			type: 1111111,

			password: 1,
			number: 3333333363,
		})
		.expect((res: request.Response) => {
			tests++;
			if (res.body.message_send !== false) {
				throw new Error("POST /message/send negative test 2 failed (" + "body:" + res.body + " status:" + res.status + " text:" + res.text + ")");
			} else {
				passed++;
			}
			// console.log({ res });
		});

	console.log("Run POST /message/send test");
	await agent
		.post("/message/send")
		.send({
			contact_id: 11,
			content: "",
			type: 3,

			password: 1,
			number: 3333333363,
		})
		.expect((res: request.Response) => {
			tests++;
			if (res.body.message_send !== false) {
				throw new Error("POST /message/send negative test 3 failed (" + "body:" + res.body + " status:" + res.status + " text:" + res.text + ")");
			} else {
				passed++;
			}
			// console.log({ res });
		});

	console.log("Run POST /message/new test");
	await agent
		.post("/message/new")
		.send({
			contact_id: 3,
			last_message_id: 61,

			number: 8684876466,
			password: 1,
		})
		.expect((res: request.Response) => {
			tests++;
			if (res.body.new_messages !== true) {
				throw new Error("POST /message/new positive test failed (" + "body:" + res.body + " status:" + res.status + " text:" + res.text + ")");
			} else {
				passed++;
			}
			// console.log({ res });
		});

	console.log("Run POST /message/new test");
	await agent
		.post("/message/new")
		.send({
			contact_id: 3,
			last_message_id: 89,

			number: 8684876466,
			password: 1,
		})
		.expect((res: request.Response) => {
			tests++;
			if (res.body.new_messages !== false) {
				throw new Error("POST /message/new negative test failed (" + "body:" + res.body + " status:" + res.status + " text:" + res.text + ")");
			} else {
				passed++;
			}
			// console.log({ res });
		});

	console.log("TESTS ENDED!");
	console.log(tests == passed ? "PASSED!" : "FAILED (passed " + passed + "/" + tests + " tests). Chack console log for more info");
}
