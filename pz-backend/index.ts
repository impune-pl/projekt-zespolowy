import express = require("express");
// import session = require("express-session");
import customPassport = require("passport-custom");
import path = require("path");
import DataBaseController from "./src/database/databasecontroller";
import UserHandle from "./src/userhandle";
import { Passport } from "passport";
// import fs = require("fs");

var CustomStrategy = customPassport.Strategy;

console.log("Hello!");

var dbc = new DataBaseController();
var uh = new UserHandle(dbc);
var app = express();
var passport = new Passport();
passport.use(
	"custom",
	new CustomStrategy(function (req, cb) {
		return cb(null, true);
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/static", express.static(path.join(__dirname, "../public")));

function authorizer(token: string, cb: CallableFunction) {
	// check token
}

function unauthorizedResponse(req: express.Request) {
	console.warn("Token login failed");
	return { login_successful: false };
}

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

app.get("/contacts", (request: express.Request, response: express.Response) => {
	// uh.getFriendsList(request.user.id);
	let body = request.body;
	if (body.user_id) {
		uh.getFriendsList(body.user_id)
			.then((list) => {
				response.send({ friends_list: list });
			})
			.catch((err) => {
				console.error({ getFriendsList: err });
				response.send({ friends_list: null });
			});
	} else {
		response.send({ friends_list: null });
	}
});

app.post("/contact/accept", (request: express.Request, response: express.Response) => {
	let body = request.body;
	if (body.contact_id) {
		uh.acceptInvitation(body.contact_id);
		response.send({ contact_accept: true });
	} else {
		response.send({ contact_accept: false });
	}
});

app.post("/contact/new", (request: express.Request, response: express.Response) => {
	let body = request.body;
	if (body.user_id && body.number) {
		uh.addContact(body.user_id, body.number)
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

app.get("/contact/find", (request: express.Request, response: express.Response) => {
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

app.get("/message/new", (request: express.Request, response: express.Response) => {
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

app.get("/message", (request: express.Request, response: express.Response) => {
	// uh.getMessages();
	response.send("sa");
});

app.post("/message", (request: express.Request, response: express.Response) => {
	let body = request.body;
	if (body.contact_id && body.content && body.type) {
		uh.sendMessage(body.contact_id, body.content, body.type);
		response.send({ message_send: true });
	} else {
		response.send({ message_send: false });
	}
});

// BLOCK USER

app.post("/block/user", (request: express.Request, response: express.Response) => {
	let body = request.body;
	if (body.user_id && body.target_id) {
		uh.blockUser(body.user_id, body.target_id);
		response.send({ block_user: true });
	} else {
		response.send({ block_user: false });
	}
});

// BLOCK LOCATION

app.post("/block/location", (request: express.Request, response: express.Response) => {
	let body = request.body;
	if (body.user_id && body.target_id) {
		uh.disableLocation(body.user_id, body.target_id);
		response.send({ disable_location: true });
	} else {
		response.send({ disable_location: false });
	}
});

// LOCATION

app.post("/location", (request: express.Request, response: express.Response) => {
	let body = request.body;
	if (body.user_id && body.location) {
		uh.updateLocation(body.user_id, body.location);
		response.send({ update_location: true });
	} else {
		response.send({ update_location: false });
	}
});

app.get("/location", (request: express.Request, response: express.Response) => {
	let body = request.body;
	if (body.user_id && body.target_id) {
		uh.getLocation(body.user_id, body.target_id)
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
