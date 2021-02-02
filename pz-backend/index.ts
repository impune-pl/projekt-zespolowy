import express = require("express");
import customPassport = require("passport-custom");
import path = require("path");
import DataBaseController from "./src/database/databasecontroller";
import UserHandle from "./src/userhandle";
import { Passport } from "passport";
import User from "./src/objects/user";
import { test } from "./tests/tests";
import * as cors from "cors";

var CustomStrategy = customPassport.Strategy;

console.log("Hello!");

var tests: boolean = false;
var host: string = undefined;
var port: number = undefined;
var appport: number = 4000;

if (process.argv.length > 2) {
	for (let i = 0; i < process.argv.length; i++) {
		if (process.argv[i] == "test") {
			tests = true;
		} else if (process.argv[i].startsWith("host=")) {
			host = process.argv[i].replace("host=", "");
			console.log("host=" + host);
		} else if (process.argv[i].startsWith("port=")) {
			let some_number = process.argv[i].replace("port=", "");
			console.log("post=" + some_number);
			try {
				port = Number.parseInt(some_number);
			} catch (err) {
				console.error(err);
			}
		} else if (process.argv[i].startsWith("appport=")) {
			let some_number = process.argv[i].replace("appport=", "");
			console.log("apppost=" + some_number);
			try {
				appport = Number.parseInt(some_number);
			} catch (err) {
				console.error(err);
			}
		}
	}
}

var dbc = new DataBaseController(host, port);
var uh = new UserHandle(dbc);
var app = express();
var passport = new Passport();
passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});
passport.use(
	"custom",
	new CustomStrategy(function (req: express.Request, cb: CallableFunction) {
		// console.log(req.headers);
		if (req.headers.token) {
			// check for token
			uh.loginWithToken(req.headers.token.toString())
				.then((res) => {
					// console.log(res);
					// if (res instanceof User) {
					cb(null, res);
					// } else {
					// cb("Wrong instance of object", false);
					// }
				})
				.catch((err) => {
					console.error({ login_failed: err });
					cb(null, false, { message: err });
				});
		} else if (req.body.number && req.body.password) {
			uh.loginGetUser(req.body.number, req.body.password)
				.then((user) => {
					// if (user instanceof User) {
					cb(null, user);
					// } else {
					// cb("Wrong instance of object", false);
					// }
				})
				.catch((err) => {
					console.error({ login_failed: err });
					cb(null, false, { message: err });
				});
		} else {
			cb(null, false);
		}
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

app.use("/static", express.static(path.join(__dirname, "../public")));

// TEST

// app.get("/ping", (request: express.Request, response: express.Response) => {
// 	response.send({ "PONG!": request.user });
// });

// HOME PAGE

app.get("/", (request: express.Request, response: express.Response) => {
	response.sendFile(path.join(__dirname, "../public/index.html"));
});

// LOGIN

app.post("/login", (request: express.Request, response: express.Response) => {
	let body = request.body;
	if (body.password && body.number) {
		uh.login(body.number, body.password)
			.then((token) => {
				response.send({ login_successful: true, token });
			})
			.catch((err) => {
				console.error({ login_failed: err });
				response.send({ login_successful: false });
			});
	} else {
		response.send({ login_successful: false });
	}
});

// REGISTER

app.post("/register", (request: express.Request, response: express.Response) => {
	let body = request.body;
	// console.log(body);
	if (body.password && body.number && body.email) {
		if (!isNaN(body.number.trim())) {
			uh.register(body.number.trim(), body.email.trim(), body.password.trim())
				.then((res) => {
					response.send({ register_successful: true });
				})
				.catch((err) => {
					console.error({ register_failed: err });
					response.send({ register_successful: false });
				});
		} else {
			response.send({ register_successful: false });
		}
	} else {
		response.send({ register_successful: false });
	}
});

// USER DATA

app.get("/user", passport.authenticate("custom"), (request: express.Request, response: express.Response) => {
	// uh.getFriendsList(request.user.id);
	if (request.user) {
		let user = request.user as User;
		response.send({ current_user: user });
	} else {
		response.send({ current_user: null });
	}
});

// CONTACTS

app.get("/contacts", passport.authenticate("custom"), (request: express.Request, response: express.Response) => {
	// uh.getFriendsList(request.user.id);
	uh.getFriendsList((request.user as User).id)
		.then((list) => {
			response.send({ friends_list: list });
		})
		.catch((err) => {
			console.error({ getFriendsList: err });
			response.send({ friends_list: null });
		});
});

app.get("/contact/:id/accept", passport.authenticate("custom"), (request: express.Request, response: express.Response) => {
	let c_id = request.params.id;
	if (c_id && !isNaN(Number.parseInt(c_id))) {
		uh.acceptInvitation(Number.parseInt(c_id))
			.then(() => {
				response.send({ contact_accept: true });
			})
			.catch((err) => {
				console.error({ acceptInvitation: err });
				response.send({ contact_accept: false });
			});
	} else {
		response.send({ contact_accept: false });
	}
});

app.post("/contact/:number/new", passport.authenticate("custom"), (request: express.Request, response: express.Response) => {
	let number = request.params.number;
	if (number && !isNaN(Number.parseInt(number))) {
		if ((request.user as User).phoneNumber === Number.parseInt(number)) {
			response.send({ new_contact: false });
		} else {
			uh.addContact((request.user as User).id, Number.parseInt(number))
				.then((res) => {
					response.send({ new_contact: res });
				})
				.catch((err) => {
					console.error({ new_contact: err });
					response.send({ new_contact: false });
				});
		}
	} else {
		response.send({ new_contact: false });
	}
});

app.get("/contact/:number/find", passport.authenticate("custom"), (request: express.Request, response: express.Response) => {
	let number = request.params.number;
	if (number && !isNaN(Number.parseInt(number))) {
		if ((request.user as User).phoneNumber === Number.parseInt(number)) {
			response.send({ find_contact: false });
		} else {
			uh.findContact(Number.parseInt(number))
				.then((exists) => {
					response.send({ find_contact: exists });
				})
				.catch((err) => {
					console.error({ find_contact: err });
					response.send({ find_contact: false });
				});
		}
	} else {
		response.send({ find_contact: false });
	}
});

// MESSAGE

app.get("/message/:contact_id/:last_message_id/new", passport.authenticate("custom"), (request: express.Request, response: express.Response) => {
	let contact_id = request.params.contact_id,
		last_message_id = request.params.last_message_id;
	if (contact_id && last_message_id && !isNaN(Number.parseInt(contact_id)) && !isNaN(Number.parseInt(last_message_id))) {
		uh.checkForNewMessages(Number.parseInt(contact_id), Number.parseInt(last_message_id))
			.then((new_messages) => {
				response.send({ new_messages });
			})
			.catch((err) => {
				console.error({ new_messages: err });
				response.send({ new_messages: false });
			});
	} else {
		response.send({ new_messages: false });
	}
});

app.get("/messages/:contact_id", passport.authenticate("custom"), (request: express.Request, response: express.Response) => {
	// uh.getMessages();
	let contact_id = request.params.contact_id;
	if (contact_id && !isNaN(Number.parseInt(contact_id))) {
		uh.getAllMessages(Number.parseInt(contact_id))
			.then((messages) => {
				response.send({ messages });
			})
			.catch((err) => {
				console.error({ messages: err });
				response.send({ messages: null });
			});
	} else {
		response.send({ messages: null });
	}
});

app.get("/message/types", (request: express.Request, response: express.Response) => {
	uh.getMessageTypes()
		.then((types) => {
			response.send({ message_types: types });
		})
		.catch((err) => {
			console.error({ message_types: err });
			response.send({ message_types: null });
		});
});

app.post("/message/:contact_id/send", passport.authenticate("custom"), (request: express.Request, response: express.Response) => {
	let body = request.body,
		contact_id = request.params.contact_id;
	if (contact_id && body.content && body.type && !isNaN(Number.parseInt(contact_id))) {
		uh.sendMessage((request.user as User).id, Number.parseInt(contact_id), body.content, body.type)
			.then((send) => {
				response.send({ message_send: send });
			})
			.catch((err) => {
				console.error({ message_send: err });
				response.send({ message_send: false });
			});
	} else {
		response.send({ message_send: false });
	}
});

// BLOCK USER

app.post("/block/user/:contact_id", passport.authenticate("custom"), (request: express.Request, response: express.Response) => {
	let contact_id = request.params.contact_id;
	if (contact_id && !isNaN(Number.parseInt(contact_id))) {
		uh.blockUser(Number.parseInt(contact_id));
		response.send({ block_user: true });
	} else {
		response.send({ block_user: false });
	}
});

// BLOCK LOCATION

app.post("/block/location/:contact_id", passport.authenticate("custom"), (request: express.Request, response: express.Response) => {
	let contact_id = request.params.contact_id;
	if (contact_id && !isNaN(Number.parseInt(contact_id))) {
		uh.disableLocation(Number.parseInt(contact_id));
		response.send({ disable_location: true });
	} else {
		response.send({ disable_location: false });
	}
});

app.post("/unlock/location/:contact_id", passport.authenticate("custom"), (request: express.Request, response: express.Response) => {
	let contact_id = request.params.contact_id;
	if (contact_id && !isNaN(Number.parseInt(contact_id))) {
		uh.enableLocation(Number.parseInt(contact_id));
		response.send({ disable_location: true });
	} else {
		response.send({ disable_location: false });
	}
});

// LOCATION

app.post("/location/:location", passport.authenticate("custom"), (request: express.Request, response: express.Response) => {
	let location = request.params.location;
	// console.log({ request });
	if (location) {
		uh.updateLocation((request.user as User).id, location);
		response.send({ update_location: true });
	} else {
		response.send({ update_location: false });
	}
});

app.get("/location/:contact_id", passport.authenticate("custom"), (request: express.Request, response: express.Response) => {
	let contact_id = request.params.contact_id;
	if (contact_id && !isNaN(Number.parseInt(contact_id))) {
		uh.getLocation((request.user as User).id, Number.parseInt(contact_id))
			.then((location) => {
				response.send({ location });
			})
			.catch((err) => {
				console.error(err);
				response.send({ location: null });
			});
	} else {
		response.send({ location: null });
	}
});

app.post("/logout", passport.authenticate("custom"), (request: express.Request, response: express.Response) => {
	if (request.headers.token) {
		uh.logout(request.headers.token.toString());
	}
});

app.listen(appport, () => {
	console.log("Running at port 4000\n http://localhost:4000");
});

if (tests) test(app);
