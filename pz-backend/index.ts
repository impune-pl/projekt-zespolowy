import express = require("express");
import customPassport = require("passport-custom");
import path = require("path");
import DataBaseController from "./src/database/databasecontroller";
import UserHandle from "./src/userhandle";
import { Passport } from "passport";
import User from "./src/objects/user";
import { test } from "./tests/tests";

var CustomStrategy = customPassport.Strategy;

console.log("Hello!");

var dbc = new DataBaseController();
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
		if (req.body.token) {
			// check for token
			uh.loginWithToken(req.body.token)
				.then((res) => {
					console.log(res);
					if (res instanceof User) {
						cb(null, res);
					} else {
						cb("Wrong instance of object", false);
					}
				})
				.catch((err) => {
					cb(err, false);
				});
		} else if (req.body.number && req.body.password) {
			uh.login(req.body.number, req.body.password)
				.then((user) => {
					console.log(user);
					// if (user instanceof User) {
					cb(null, user);
					// } else {
					// cb("Wrong instance of object", false);
					// }
				})
				.catch((err) => {
					console.error({ login_failed: err });
					cb(err, false);
				});
		} else {
			cb(null, false);
		}
	})
);

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use("/static", express.static(path.join(__dirname, "../public")));

// TEST

app.get("/ping", (request: express.Request, response: express.Response) => {
	response.send({ "PONG!": request.body });
});

// HOME PAGE

app.get("/", (request: express.Request, response: express.Response) => {
	response.sendFile(path.join(__dirname, "../public/index.html"));
});

// LOGIN

app.post("/login", (request: express.Request, response: express.Response) => {
	let body = request.body;
	if (body.password && body.number) {
		uh.login(body.number, body.password)
			.then((res) => {
				response.send({ login_successful: true });
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
	if (body.password && body.number && body.email) {
		uh.register(body.number, body.email, body.password)
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
});

// CONTACTS

app.get("/contacts", passport.authenticate("custom", { failureRedirect: "/" }), (request: express.Request, response: express.Response) => {
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

app.post("/contact/accept", passport.authenticate("custom", { failureRedirect: "/" }), (request: express.Request, response: express.Response) => {
	let body = request.body;
	if (body.contact_id) {
		uh.acceptInvitation(body.contact_id)
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

app.post("/contact/new", passport.authenticate("custom", { failureRedirect: "/" }), (request: express.Request, response: express.Response) => {
	let body = request.body;
	if (body.number) {
		uh.addContact((request.user as User).id, body.number)
			.then(() => {
				response.send({ new_contact: true });
			})
			.catch((err) => {
				console.error({ new_contact: err });
				response.send({ new_contact: false });
			});
	} else {
		response.send({ new_contact: false });
	}
});

app.get("/contact/find", passport.authenticate("custom", { failureRedirect: "/" }), (request: express.Request, response: express.Response) => {
	let body = request.body;
	if (body.number) {
		uh.findContact(body.number)
			.then((exists) => {
				response.send({ find_contact: exists });
			})
			.catch((err) => {
				console.error({ find_contact: err });
				response.send({ find_contact: false });
			});
	} else {
		response.send({ find_contact: false });
	}
});

// MESSAGE

app.post("/message/new", passport.authenticate("custom", { failureRedirect: "/" }), (request: express.Request, response: express.Response) => {
	let body = request.body;
	if (body.contact_id && body.last_message_id) {
		uh.checkForNewMessages(body.contact_id, body.last_message_id)
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

app.post("/message", passport.authenticate("custom", { failureRedirect: "/" }), (request: express.Request, response: express.Response) => {
	// uh.getMessages();
	let body = request.body;
	if (body.contact_id) {
		uh.getAllMessages(body.contact_id)
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

app.post("/message/send", passport.authenticate("custom", { failureRedirect: "/" }), (request: express.Request, response: express.Response) => {
	let body = request.body;
	if (body.contact_id && body.content && body.type) {
		uh.sendMessage((request.user as User).id, body.contact_id, body.content, body.type)
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

app.post("/block/user", passport.authenticate("custom", { failureRedirect: "/" }), (request: express.Request, response: express.Response) => {
	let body = request.body;
	if (body.contact_id) {
		uh.blockUser(body.contact_id);
		response.send({ block_user: true });
	} else {
		response.send({ block_user: false });
	}
});

// BLOCK LOCATION

app.post("/location/block", passport.authenticate("custom", { failureRedirect: "/" }), (request: express.Request, response: express.Response) => {
	let body = request.body;
	if (body.contact_id) {
		uh.disableLocation(body.contact_id);
		response.send({ disable_location: true });
	} else {
		response.send({ disable_location: false });
	}
});

app.post("/location/unlock", passport.authenticate("custom", { failureRedirect: "/" }), (request: express.Request, response: express.Response) => {
	let body = request.body;
	if (body.contact_id) {
		uh.enableLocation(body.contact_id);
		response.send({ disable_location: true });
	} else {
		response.send({ disable_location: false });
	}
});

// LOCATION

app.post("/location", passport.authenticate("custom", { failureRedirect: "/" }), (request: express.Request, response: express.Response) => {
	let body = request.body;
	console.log({ request });
	if (body.location) {
		uh.updateLocation((request.user as User).id, body.location);
		response.send({ update_location: true });
	} else {
		response.send({ update_location: false });
	}
});

app.get("/location", passport.authenticate("custom", { failureRedirect: "/" }), (request: express.Request, response: express.Response) => {
	let body = request.body;
	if (body.contact_id) {
		uh.getLocation((request.user as User).id, body.contact_id)
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

app.listen(4000, () => {
	console.log("Running at port 4000\n http://localhost:4000");
});

if (process.argv.length > 2) {
	if (process.argv.indexOf("test") > -1) {
		test(app);
	}
}
