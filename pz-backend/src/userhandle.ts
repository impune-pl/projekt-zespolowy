import DataBaseController from "./database/databasecontroller";
import Contact from "./objects/contect";
import Message from "./objects/message";
import Token from "./objects/token";
import User from "./objects/user";
import crypto = require("crypto");
import * as pg from "pg";

export default class UserHandle {
	db: DataBaseController;

	constructor(db: DataBaseController) {
		this.db = db;
		this.db.connect();
	}

	login(number: number, password: string) {
		return this.db.checkLoginData(number, this.generateHash(password));
	}

	loginGetUser(number: number, password: string) {
		return this.db.checkLoginData(number, this.generateHash(password));
	}

	loginWithToken(token: string) {
		return this.db.checkLoginDataWithToken(token);
	}

	register(number: number, email: string, password: string) {
		return new Promise((resolve, reject) => {
			this.db.getUserByNumber(number).then((user: pg.QueryResult) => {
				if (user.rowCount > 0) {
					reject("User exists");
				} else {
					let user = new User();
					user.phoneNumber = number;
					user.email = email;
					user.passwordHash = this.generateHash(password);
					this.db.addUser(user);
					resolve(user);
				}
			});
		});
	}

	addContact(id: number, number: number) {
		return new Promise((resolve, reject) => {
			let contact = new Contact();
			contact.userId = id;
			this.db
				.getUserByNumber(number)
				.then((users: pg.QueryResult) => {
					if (users.rowCount < 1) {
						resolve(false);
					}
					contact.contactId = users.rows[0].id;
					contact.userId = id;
					contact.isLocationShared = false;
					contact.isAccepted = false;
					contact.isBlocked = false;
					this.db
						.addContact(contact)
						.then(() => {
							resolve(true);
						})
						.catch((err) => {
							console.error({ add_contact: err });
							reject(err);
						});
				})
				.catch((err) => {
					console.error({ add_contact: err });
					reject(err);
				});
		});
	}

	// getInvitationsList(id: number): Contact[] {
	// 	return [];
	// }

	acceptInvitation(contact_id: number) {
		return new Promise((resolve, reject) => {
			this.db.crud.contacts
				.accept(contact_id)
				.then(() => {
					resolve(true);
				})
				.catch((err) => {
					console.error({ acceptInvitation: err });
					reject(err);
				});
		});
	}

	getFriendsList(id: number) {
		return new Promise((resolve, reject) => {
			this.db.crud.contacts
				.selectUserId(id)
				// .find("userId=" + id + " ")
				.then((contacts: pg.QueryResult) => {
					console.log({ contacts });

					// this.db.crud.contacts.selectContactId(id).then((another_contacts: pg.QueryResult) => {
					// 	console.log({ another_contacts });

					// });
					resolve(contacts.rows);
				})
				.catch((err) => {
					console.error({ getFriendsList: err });
					reject(err);
				});
		});
	}

	updateLocation(id: number, location: string) {
		this.db
			.getUser(id)
			.then((user: pg.QueryResult) => {
				if (user.rowCount > 0) {
					let usr = user.rows[0] as User;
					usr.lastLocation = location;
					usr.lastLocationTimestamp = new Date();
					this.db.updateUserData(usr);
				} else {
					console.error({ location_update: "User does not exists" });
				}
			})
			.catch((err) => {
				console.error({ location_update: err });
			});
	}

	getLocation(id: number, contact_id: number) {
		return new Promise((resolve, reject) => {
			this.db
				.getContact(contact_id)
				.then((contact_res: pg.QueryResult) => {
					if (contact_res.rowCount > 0) {
						let contact = contact_res.rows[0] as Contact;
						this.canGetLocation(id, contact.contactId)
							.then((can) => {
								console.log({ can });
								if (can) {
									this.db
										.getLocation(contact.contactId)
										.then((location: string) => {
											console.log({ location });
											resolve(location);
										})
										.catch((err) => {
											console.error({ get_location_error: err });
											reject(err);
										});
								} else {
									resolve(null);
								}
							})
							.catch((err) => {
								console.error({ get_location_error: err });
								reject(err);
							});
					} else {
						console.error({ get_location_error: "Invalid contact" });
						reject("Invalid contact");
					}
				})
				.catch((err) => {
					console.error({ get_location_error: err });
					reject(err);
				});
		});
	}

	canGetLocation(id: number, target_id: number) {
		// let where = "userId=" + target_id + " and contactId=" + id + " ";
		return new Promise((resolve, reject) => {
			this.db.crud.contacts
				.selectContactUserId(target_id, id)
				// .find(where)
				.then((contact: pg.QueryResult) => {
					console.log(contact.rows);
					if (contact.rowCount > 0) resolve((contact.rows[0] as Contact).isLocationShared);
					else resolve(false);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	disableLocation(contact_id: number) {
		return new Promise((resolve, reject) => {
			this.db.crud.contacts
				.blockLocation(contact_id)
				.then((contact) => {
					resolve(true);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	enableLocation(contact_id: number) {
		return new Promise((resolve, reject) => {
			this.db.crud.contacts
				.unlockLocation(contact_id)
				.then((contact) => {
					resolve(true);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	isUserBlocekd(user_id: number, target_id: number) {
		// let where = "userId=" + user_id + " and contactId=" + target_id + " ";
		return new Promise((resolve, reject) => {
			this.db.crud.contacts
				.selectContactUserId(target_id, user_id)
				// .find(where)
				.then((contact: pg.QueryResult) => {
					console.log({ contact });
					if (contact.rowCount > 0) resolve((contact.rows[0] as Contact).isBlocked);
					else resolve(true);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	sendMessage(contact_id: number, message: string, type: string) {
		this.db
			.getContact(contact_id)
			.then((cont: pg.QueryResult) => {
				if (cont.rowCount > 0) {
					let contact = cont.rows[0] as Contact;
					let can = this.isUserBlocekd(contact.contactId, contact.userId);
					if (can) {
						let mess = new Message();
						mess.contact_id = contact_id;
						mess.content = message;
						mess.type = type;
						// let date_now = new Date();
						mess.date = new Date(); //String(date_now.getDate()).padStart(2, "0") + "-" + String(date_now.getMonth() + 1).padStart(2, "0") + "-" + date_now.getFullYear();
						this.db.addMessage(mess);
					}
				}
			})
			.catch((err) => {
				console.error({ sendMessage: err });
			});
	}

	checkForNewMessages(contact_id: number, last_message_id: number) {
		return this.db.checkForNewMessages(contact_id, last_message_id);
	}

	getMessages(contact_id: number, from_id: number, how_many: number): Message[] {
		return this.db.getMessages(contact_id, from_id, how_many);
	}

	getAllMessages(contact_id: number) {
		return new Promise((resolve, reject) => {
			this.db
				.getAllMessages(contact_id)
				.then((messages: pg.QueryResult) => {
					console.log({ messages, rows: messages.rows });
					resolve(messages.rows);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	getMessageTypes() {
		return new Promise((resolve, reject) => {
			this.db.crud.message_types
				.selectAll()
				.then((types: pg.QueryResult) => {
					console.log({ types, rows: types.rows });
					resolve(types.rows);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	blockUser(contact_id: number) {
		return new Promise((resolve, reject) => {
			this.db.crud.contacts
				.blockUser(contact_id)
				.then((contact: pg.QueryResult) => {
					console.log({ contact });
					resolve(true);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	findContact(number: number) {
		return new Promise((resolve, reject) => {
			this.db.crud.user
				.selectNumber(number.toString())
				// .find("phoneNumber=" + number + " ")
				.then((user: pg.QueryResult) => {
					console.log({ user });
					resolve(user.rowCount > 0);
				})
				.catch((err) => {
					console.error({ find_contact: err });
					reject(err);
				});
		});
	}

	createToken(id: number): Token {
		return new Token();
	}

	generateHash(variable: string): string {
		return variable;
		return crypto.createHash("sha256").update(variable).digest("hex");
	}
}
