import request = require("supertest");
import express = require("express");
import MessageTypes from "../src/objects/messagetypes";

export async function test(app: express.Express) {
	let agent = request.agent(app);
	let passed = 0;
	let tests = 11; // prepares are not counted

	let user_a = {
		number: 111111111,
		password: 1,
		email: "asdeg@pom.pl",
		id: 0,
		token: "",
	};
	let user_b = {
		number: 222222222,
		password: 1,
		email: "bsdeg@pom.pl",
		id: 0,
		token: "",
	};

	let contact_id: number;
	let mtypes: string;
	let lmid: number;
	let nmid: number;

	try {
		console.log("Run GET / test");
		await agent.get("/").expect((res: request.Response) => {
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
				password: user_a.password,
				number: user_a.number,
			})
			.expect((res: request.Response) => {
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
				password: user_a.password,
				number: user_a.number,
				email: user_a.email,
			})
			.expect((res: request.Response) => {
				if (res.body.register_successful !== true) {
					throw new Error("POST /register positive test failed (" + "body:" + res.body + " status:" + res.status + " text:" + res.text + ")");
				} else {
					passed++;
				}
				// console.log({ res });
			});

		console.log("Run POST /login test");
		await agent
			.post("/login")
			.send({
				password: user_a.password,
				number: user_a.number,
			})
			.expect((res: request.Response) => {
				if (res.body.login_successful !== true) {
					throw new Error("POST /login positive test failed (" + "body:" + res.body + " status:" + res.status + " text:" + res.text + ")");
				} else {
					passed++;
					user_a.token = res.body.token;
				}
				// console.log({ res });
			});

		console.log("Run POST /register test");
		await agent
			.post("/register")
			.send({
				password: user_a.password,
				number: user_a.number,
				email: user_a.email,
			})
			.expect((res: request.Response) => {
				if (res.body.register_successful !== false) {
					throw new Error("POST /register negative test failed (" + "body:" + res.body + " status:" + res.status + " text:" + res.text + ")");
				} else {
					passed++;
				}
				// console.log({ res });
			});

		// prepare for next test
		await agent
			.post("/register")
			.send({
				password: user_b.password,
				number: user_b.number,
				email: user_b.email,
			})
			.expect((res: request.Response) => {
				// tests++;
				if (res.body.register_successful == false) {
					throw new Error(
						"POST /register (prepare POST /message/:id/send) failed (" + "body:" + res.body + " status:" + res.status + " text:" + res.text + ")"
					);
				} else {
					// passed++;
				}
				// console.log({ res });
			});
		await agent
			.post("/login")
			.send({
				password: user_b.password,
				number: user_b.number,
			})
			.expect((res: request.Response) => {
				// tests++;
				if (res.body.login_successful !== true) {
					throw new Error(
						"POST /login (prepare POST /message/:id/send) failed (" + "body:" + res.body + " status:" + res.status + " text:" + res.text + ")"
					);
				} else {
					// passed++;
					user_b.token = res.body.token;
				}
				// console.log({ res });
			});
		await agent
			.post(`/contact/${user_a.number}/new`)
			.set("token", user_b.token)
			.send()
			.expect((res: request.Response) => {
				// tests++;
				if (res.body.new_contact == false) {
					throw new Error(
						"POST /contact/" +
							user_b.number +
							"/new (prepare POST /message/:id/send) failed (" +
							"body:" +
							res.body +
							" status:" +
							res.status +
							" text:" +
							res.text +
							")"
					);
				} else {
					// passed++;
					// console.log({ res });
				}
				// console.log({ res });
			});
		await agent
			.get("/contacts")
			.set("token", user_a.token)
			.send()
			.expect((res: request.Response) => {
				// tests++;
				if (res.body.friends_list == null) {
					throw new Error(
						"GET /contacts (prepare POST /message/:id/send) failed (" + "body:" + res.body + " status:" + res.status + " text:" + res.text + ")"
					);
				} else {
					// passed++;
					contact_id = res.body.friends_list[0].id;
					user_a.id = res.body.friends_list[0].userId;
					user_b.id = res.body.friends_list[0].contact.id;
				}
				// console.log({ res });
			});
		await agent
			.get(`/contact/${contact_id}/accept`)
			.set("token", user_a.token)
			.send()
			.expect((res: request.Response) => {
				// tests++;
				if (res.body.contact_accept !== true) {
					throw new Error(
						"GET /contact/:contact_id/accept (prepare POST /message/:id/send) failed (" +
							"body:" +
							res.body +
							" status:" +
							res.status +
							" text:" +
							res.text +
							")"
					);
				}
				// console.log({ res });
			});
		await agent
			.get(`/message/types`)
			.set("token", user_a.token)
			.send()
			.expect((res: request.Response) => {
				// tests++;
				if (res.body.message_types == null) {
					throw new Error(
						"GET /message/types (prepare POST /message/:id/send) failed (" +
							"body:" +
							res.body +
							" status:" +
							res.status +
							" text:" +
							res.text +
							")"
					);
				} else {
					// passed++;
					res.body.message_types.forEach((element: MessageTypes) => {
						if (element.type.toLowerCase() == "text") {
							mtypes = element.type;
						}
					});
					if (mtypes == undefined) {
						throw new Error(
							"GET /message/types (prepare POST /message/:id/send) failed (" +
								"body:" +
								res.body +
								" status:" +
								res.status +
								" text:" +
								res.text +
								")"
						);
					}
				}
				// console.log({ res });
			});

		console.log("Run POST /message/:id/send test");
		await agent
			.post(`/message/${contact_id}/send`)
			.set("token", user_a.token)
			.send({
				content: "TEST",
				type: mtypes,
			})
			.expect((res: request.Response) => {
				// console.log({ res });
				if (res.body.message_send !== true) {
					throw new Error(
						"POST /message/" +
							contact_id.toString() +
							"/send positive test failed (" +
							"body:" +
							res.body +
							" status:" +
							res.status +
							" text:" +
							res.text +
							") for message type id: " +
							mtypes
					);
				} else {
					passed++;
				}
				// console.log({ res });
			});

		console.log("Run POST /message/:id/send test");
		await agent
			.post("/message/111111111/send")
			.set("token", user_a.token)
			.send({
				content: "TEST",
				type: mtypes,
			})
			.expect((res: request.Response) => {
				if (res.body.message_send !== false) {
					throw new Error("POST /message/send negative test 1 failed (" + "body:" + res.body + " status:" + res.status + " text:" + res.text + ")");
				} else {
					passed++;
				}
				// console.log({ res });
			});

		console.log("Run POST /message/send test");
		await agent
			.post(`/message/${contact_id}/send`)
			.set("token", user_a.token)
			.send({
				content: "Umba umba asdasfkr fgverng",
				type: mtypes + 11111111,
			})
			.expect((res: request.Response) => {
				if (res.body.message_send !== false) {
					throw new Error("POST /message/send negative test 2 failed (" + "body:" + res.body + " status:" + res.status + " text:" + res.text + ")");
				} else {
					passed++;
				}
				// console.log({ res });
			});

		console.log("Run POST /message/send test");
		await agent
			.post(`/message/${contact_id}/send`)
			.set("token", user_a.token)
			.send({
				content: "",
				type: mtypes,
			})
			.expect((res: request.Response) => {
				if (res.body.message_send !== false) {
					throw new Error("POST /message/send negative test 3 failed (" + "body:" + res.body + " status:" + res.status + " text:" + res.text + ")");
				} else {
					passed++;
				}
				// console.log({ res });
			});

		//prepare
		await agent
			.post(`/message/${contact_id}/send`)
			.set("token", user_a.token)
			.send({
				content: "TEST",
				type: mtypes,
			})
			.expect((res: request.Response) => {
				// tests++;
				// console.log({ res });
				if (res.body.message_send !== true) {
					throw new Error(
						"POST /message/:contact_id/send (prepare POST /message/:contact_id/:last_message_id/new test) failed (" +
							"body:" +
							res.body +
							" status:" +
							res.status +
							" text:" +
							res.text +
							")"
					);
				} else {
					// passed++;
				}
				// console.log({ res });
			});
		await agent
			.post(`/message/${contact_id}/send`)
			.set("token", user_a.token)
			.send({
				content: "TEST",
				type: mtypes,
			})
			.expect((res: request.Response) => {
				// tests++;
				// console.log({ res });
				if (res.body.message_send !== true) {
					throw new Error(
						"POST /message/:contact_id/send (prepare POST /message/:contact_id/:last_message_id/new test) failed (" +
							"body:" +
							res.body +
							" status:" +
							res.status +
							" text:" +
							res.text +
							")"
					);
				} else {
					// passed++;
				}
				// console.log({ res });
			});

		await agent
			.get(`/messages/${contact_id}`)
			.set("token", user_a.token)
			.send()
			.expect((res: request.Response) => {
				// tests++;
				if (res.body.messages == null) {
					throw new Error(
						"GET /messages/:contact_id (prepare POST /message/:contact_id/:last_message_id/new test) failed (" +
							"body:" +
							res.body +
							" status:" +
							res.status +
							" text:" +
							res.text +
							")"
					);
				} else {
					nmid = res.body.messages[0].id;
					lmid = res.body.messages[res.body.messages.length - 1].id;
					// passed++;
				}
				// console.log({ res });
			});

		console.log("Run POST /message/:contact_id/:last_message_id/new test");
		await agent
			.get(`/message/${contact_id}/${lmid}/new`)
			.set("token", user_a.token)
			.send()
			.expect((res: request.Response) => {
				if (res.body.new_messages !== true) {
					throw new Error(
						"POST /message/" +
							contact_id +
							"/" +
							lmid +
							"/new positive test failed (" +
							"body:" +
							res.body +
							" status:" +
							res.status +
							" text:" +
							res.text +
							")"
					);
				} else {
					passed++;
				}
				// console.log({ res });
			});

		console.log("Run POST /message/:contact_id/:last_message_id/new test");
		await agent
			.get(`/message/${contact_id}/${nmid}/new`)
			.set("token", user_a.token)
			.send()
			.expect((res: request.Response) => {
				if (res.body.new_messages !== false) {
					throw new Error("POST /message/new negative test failed (" + "body:" + res.body + " status:" + res.status + " text:" + res.text + ")");
				} else {
					passed++;
				}
				// console.log({ res });
			});
	} catch (e) {
		console.error(e);
	}

	console.log("TESTS ENDED!");
	console.log(tests == passed ? "PASSED!" : "FAILED (passed " + passed + "/" + tests + " tests). Chack console log for more info");
}
