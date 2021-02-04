import DataBaseController from "./database/databasecontroller";
import Contact from "./objects/contect";
import Message from "./objects/message";
import Token from "./objects/token";
import User from "./objects/user";
import crypto = require("crypto");
import * as pg from "pg";
import MessageTypes from "./objects/messagetypes";

export default class UserHandle {
	db: DataBaseController;

	constructor(db: DataBaseController) {
		this.db = db;
		this.db.connect();
	}

	// LOGIN

	login(number: number, password: string) {
		return new Promise((resolve, reject) => {
			this.db
				.checkLoginData(number, this.generateHash(password))
				.then((loggedin) => {
					if (loggedin) {
						this.db
							.getUserByNumber(number)
							.then((result: pg.QueryResult) => {
								if (result.rowCount > 0) {
									let user = result.rows[0];
									let token = this.createToken(user);
									this.db
										.insertToken(token)
										.then(() => {
											this.db
												.checkTokens()
												.then(() => {
													resolve(token.token);
												})
												.catch((err) => {
													reject(err);
												});
										})
										.catch((err) => {
											reject(err);
										});
								} else {
									reject(false);
								}
							})
							.catch((err) => {
								reject(err);
							});
					} else {
						reject(false);
					}
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
	loginGetUser(number: number, password: string) {
		return new Promise((resolve, reject) => {
			this.db
				.checkLoginData(number, this.generateHash(password))
				.then((loggedin) => {
					if (loggedin) {
						this.db.getUserByNumber(number).then((result: pg.QueryResult) => {
							if (result.rowCount > 0) {
								resolve(result.rows[0]);
							} else {
								reject(false);
							}
						});
					} else {
						reject(false);
					}
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
	loginWithToken(token: string) {
		return this.db.checkLoginDataWithToken(token);
	}

	// REGISTER

	register(number: number, email: string, password: string) {
		return new Promise((resolve, reject) => {
			this.db
				.getUserByNumber(number)
				.then((user: pg.QueryResult) => {
					if (user.rowCount > 0) {
						reject("User exists");
					} else {
						let user = new User();
						user.phoneNumber = number;
						user.email = email;
						user.passwordHash = this.generateHash(password);
						this.db
							.addUser(user)
							.then(() => {
								resolve(user);
							})
							.catch((err) => {
								console.error(err);
								reject(err);
							});
					}
				})
				.catch((err) => {
					console.error(err);
					reject(err);
				});
		});
	}

	// LOGOUT

	logout(old_token: string) {
		this.db.removeToken(old_token);
	}

	// USER

	getUserData(user_id: number) {
		return this.db.getUserData(user_id);
	}

	getFriendsList(id: number) {
		return this.db.getFriendsList(id);
	}

	// CONTACT

	unlockUser(contact_id: number) {
		return this.db.unlockUser(contact_id);
	}

	blockUser(contact_id: number) {
		return this.db.blockUser(contact_id);
	}

	findContact(number: number) {
		return this.db.findContactByNumber(number);
	}

	findContactcViaEmail(email: string) {
		return this.db.findContactByMail(email);
	}

	getContactPair(user_id: number, contact_id: number) {
		return this.db.getContactPair(user_id, contact_id);
	}

	addContact(id: number, number: number) {
		return new Promise((resolve, reject) => {
			this.db
				.checkIfInvitationExists(number, id)
				.then((res: boolean) => {
					if (res) {
						resolve(false);
					} else {
						let contact = new Contact();
						contact.userId = id;
						this.db
							.getUserByNumber(number)
							.then((users: pg.QueryResult) => {
								if (users.rowCount < 1) {
									resolve(false);
								} else {
									contact.contactId = id;
									contact.userId = users.rows[0].id;
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
								}
							})
							.catch((err) => {
								console.error({ add_contact: err });
								reject(err);
							});
					}
				})
				.catch((err) => {
					console.error({ add_contact: err });
					reject(err);
				});
		});
	}

	acceptInvitation(contact_id: number) {
		return this.db.acceptInvitation(contact_id);
	}

	dismissInvitation(contact_id: number) {
		return this.db.dismissInvitation(contact_id);
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
								// console.log({ can });
								if (can) {
									this.db
										.getLocation(contact.contactId)
										.then((location: string) => {
											// console.log({ location });
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
		return this.db.canGetLocation(id, target_id);
	}

	disableLocation(contact_id: number) {
		return this.db.disableLocation(contact_id);
	}

	enableLocation(contact_id: number) {
		return this.db.enableLocation(contact_id);
	}

	isUserBlocekd(user_id: number, target_id: number) {
		return this.db.isUserBlocekd(user_id, target_id);
	}

	// MESSAGE

	sendMessage(user_id: number, contact_id: number, message: string, type: string) {
		return new Promise((resolve, reject) => {
			this.db
				.getContact(contact_id)
				.then((cont: pg.QueryResult) => {
					if (cont.rowCount > 0) {
						let contact = cont.rows[0] as Contact;
						if (contact.userId !== user_id) resolve(false);
						this.isUserBlocekd(contact.contactId, contact.userId)
							.then((blocked1: boolean) => {
								this.isUserBlocekd(contact.userId, contact.contactId)
									.then((blocked2: boolean) => {
										if (!blocked1 && !blocked2) {
											this.db.getMessageTypes().then((types: MessageTypes[]) => {
												if (types.length > 0) {
													let flag = false;
													types.forEach((obj) => {
														if (obj.type == type) {
															flag = true;
														}
													});
													if (flag) {
														let mess = new Message();
														mess.contact_id = contact_id;
														mess.content = message;
														mess.type = type;
														mess.date = new Date();
														this.db
															.addMessage(mess)
															.then(() => resolve(true))
															.catch((err) => reject(err));
													} else {
														reject("Wrong type");
													}
												} else {
													reject("Types check error");
												}
											});
										} else {
											reject("User is blocked");
										}
									})
									.catch((err) => {
										console.error({ sendMessage: err });
										reject(err);
									});
							})
							.catch((err) => {
								console.error({ sendMessage: err });
								reject(err);
							});
					} else {
						reject("Contact does not exists");
					}
				})
				.catch((err) => {
					console.error({ sendMessage: err });
					reject(err);
				});
		});
	}

	checkForNewMessages(contact_id: number, last_message_id: number) {
		return this.db.checkForNewMessages(contact_id, last_message_id);
	}

	getMessages(contact_id: number, from_id: number) {
		return this.db.getMessages(contact_id, from_id);
	}

	getAllMessages(contact_id: number) {
		return this.db.getAllMessages(contact_id);
	}

	getMessageTypes() {
		return this.db.getMessageTypes();
	}

	// OTHER METHODS

	protected createToken(user: User): Token {
		let token = new Token();
		token.expirationTimestamp = new Date();
		token.generatedTimestamp = token.expirationTimestamp;
		token.expirationTimestamp.setDate(token.expirationTimestamp.getDate() + 1);
		token.isExpired = false;
		token.userId = user.id;
		token.token = this.generateHash(Math.random().toString());
		return token;
	}

	protected generateHash(variable: string): string {
		// return variable;
		return crypto.createHash("sha256").update(variable.toString()).digest("hex");
	}
}
