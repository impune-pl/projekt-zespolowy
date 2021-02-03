import DataBaseController from "./database/databasecontroller";
import Contact from "./objects/contect";
import Message from "./objects/message";
import Token from "./objects/token";
import User from "./objects/user";
import crypto = require("crypto");
import * as pg from "pg";
import DetiledContact from "./objects/detiledcontact";
import e = require("express");

export default class UserHandle {
	db: DataBaseController;

	constructor(db: DataBaseController) {
		this.db = db;
		this.db.connect();
	}

	login(number: number, password: string) {
		return new Promise((resolve, reject) => {
			this.db
				.checkLoginData(number, this.generateHash(password))
				.then((loggedin) => {
					if (loggedin) {
						this.db.crud.user
							.selectNumber(number.toString())
							.then((result: pg.QueryResult) => {
								if (result.rowCount > 0) {
									let user = result.rows[0];
									let token = this.createToken(user);
									this.db.crud.token.insert(token);
									this.db.crud.token
										.check()
										.then(() => {
											resolve(token.token);
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
						this.db.crud.user.selectNumber(number.toString()).then((result: pg.QueryResult) => {
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

	getUserData(user_id: number) {
		return new Promise((resolve, reject) => {
			// if(this.findContact())
			this.db.crud.user
				.select(user_id)
				// .selectContactUserIDContactNumber(id, number)
				.then((res: pg.QueryResult) => {
					// console.log(res);
					if (res.rowCount > 0) {
						let user = new User();
						user.email = res.rows[0].email;
						user.phoneNumber = res.rows[0].phoneNumber;
						user.id = res.rows[0].id;
						resolve(user);
					} else {
						resolve(false);
					}
				})
				.catch((err) => {
					console.error({ add_contact: err });
					reject(err);
				});
		});
	}

	addContact(id: number, number: number) {
		return new Promise((resolve, reject) => {
			// if(this.findContact())
			this.db.crud.contacts
				.selectContactUserNumberContactID(number, id)
				// .selectContactUserIDContactNumber(id, number)
				.then((res: pg.QueryResult) => {
					// console.log(res);
					if (res.rowCount > 0) {
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
					console.error({ accept_invitation: err });
					reject(err);
				});
		});
	}

	dismissInvitation(contact_id: number) {
		return new Promise((resolve, reject) => {
			this.db.crud.contacts
				.dismiss(contact_id)
				.then(() => {
					resolve(true);
				})
				.catch((err) => {
					console.error({ dismiss_invitation: err });
					reject(err);
				});
		});
	}

	getFriendsList(id: number) {
		return new Promise((resolve, reject) => {
			this.db.crud.contacts
				.selectUserIdDetiled(id)
				// .find("userId=" + id + " ")
				.then((contacts: pg.QueryResult) => {
					// console.log({ contacts });

					// this.db.crud.contacts.selectContactId(id).then((another_contacts: pg.QueryResult) => {
					// 	console.log({ another_contacts });

					// });
					let cts: DetiledContact[] = [];
					contacts.rows.forEach((row) => {
						let dc = new DetiledContact();
						// console.log(row);
						dc.id = row.id;
						dc.userId = id;
						dc.contact = new User();
						dc.isAccepted = row.isAccepted;
						dc.isBlocked = row.isBlocked;
						dc.isLocationShared = row.isLocationShared;
						dc.contact.id = row.contactId;
						dc.contact.email = row.email;
						dc.contact.lastLocation = row.lastLocation;
						dc.contact.lastLocationTimestamp = row.lastLocationTimestamp;
						dc.contact.lastLoginTimestamp = row.lastLoginTimestamp;
						dc.contact.phoneNumber = row.phoneNumber;
						dc.contact.passwordHash = "";

						cts.push(dc);
					});
					resolve(cts);
				})
				.catch((err) => {
					console.error({ get_friends_list: err });
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
		// let where = "userId=" + target_id + " and contactId=" + id + " ";
		return new Promise((resolve, reject) => {
			this.db.crud.contacts
				.selectContactUserId(target_id, id)
				// .find(where)
				.then((contact: pg.QueryResult) => {
					// console.log(contact.rows);
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
					// console.log({ contact });
					if (contact.rowCount > 0) resolve((contact.rows[0] as Contact).isBlocked);
					else resolve(true);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	sendMessage(user_id: number, contact_id: number, message: string, type: string) {
		return new Promise((resolve, reject) => {
			this.db
				.getContact(contact_id)
				.then((cont: pg.QueryResult) => {
					if (cont.rowCount > 0) {
						let contact = cont.rows[0] as Contact;
						if (contact.userId !== user_id) resolve(false);
						let can = this.isUserBlocekd(contact.contactId, contact.userId);
						if (can) {
							this.db.crud.message_types.selectAll().then((types: pg.QueryResult) => {
								if (types.rowCount > 0) {
									let flag = false;
									types.rows.forEach((obj) => {
										if (obj.type == type) {
											flag = true;
										}
									});
									if (flag) {
										let mess = new Message();
										mess.contact_id = contact_id;
										mess.content = message;
										mess.type = type;
										// let date_now = new Date();
										mess.date = new Date(); //String(date_now.getDate()).padStart(2, "0") + "-" + String(date_now.getMonth() + 1).padStart(2, "0") + "-" + date_now.getFullYear();
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
					} else {
						reject("Contact does not exists");
					}
				})
				.catch((err) => {
					reject(err);
					console.error({ sendMessage: err });
				});
		});
	}

	checkForNewMessages(contact_id: number, last_message_id: number) {
		return this.db.checkForNewMessages(contact_id, last_message_id);
	}

	getMessages(contact_id: number, from_id: number) {
		return new Promise((resolve, reject) => {
			this.db
				.getMessages(contact_id, from_id)
				.then((messages: pg.QueryResult) => {
					// console.log({ messages, rows: messages.rows });
					resolve(messages.rows);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	getAllMessages(contact_id: number) {
		return new Promise((resolve, reject) => {
			this.db
				.getAllMessages(contact_id)
				.then((messages: pg.QueryResult) => {
					// console.log({ messages, rows: messages.rows });
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
					// console.log({ types, rows: types.rows });
					resolve(types.rows);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	unlockUser(contact_id: number) {
		return new Promise((resolve, reject) => {
			this.db.crud.contacts
				.unlockUser(contact_id)
				.then((contact: pg.QueryResult) => {
					// console.log({ contact });

					resolve(true);
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
					// console.log({ contact });
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
					// console.log({ user });
					if (user.rowCount > 0) {
						let usr = new User();
						usr.id = user.rows[0].id;
						usr.phoneNumber = user.rows[0].phoneNumber;
						usr.email = user.rows[0].email;
						resolve(usr);
					} else {
						resolve(false);
					}
				})
				.catch((err) => {
					console.error({ find_contact: err });
					reject(err);
				});
		});
	}

	findContactcViaEmail(email: string) {
		return new Promise((resolve, reject) => {
			this.db.crud.user
				.selectEmailLike(email)
				// .find("phoneNumber=" + number + " ")
				.then((users: pg.QueryResult) => {
					if (users.rowCount > 0) {
						let users_array: User[] = [];
						users.rows.forEach((usr: User) => {
							let user = new User();
							user.id = usr.id;
							user.phoneNumber = usr.phoneNumber;
							user.email = usr.email;
							users_array.push(user);
						});
						resolve(users_array);
					} else {
						resolve(false);
					}
					// console.log({ user });
				})
				.catch((err) => {
					console.error({ find_contact: err });
					reject(err);
				});
		});
	}

	createToken(user: User): Token {
		let token = new Token();
		token.expirationTimestamp = new Date();
		token.generatedTimestamp = token.expirationTimestamp;
		token.expirationTimestamp.setDate(token.expirationTimestamp.getDate() + 1);
		token.isExpired = false;
		token.userId = user.id;
		token.token = this.generateHash(Math.random().toString());
		return token;
	}

	logout(old_token: string) {
		this.db.crud.token.selectToken(old_token).then((res: pg.QueryResult) => {
			if (res.rowCount > 0) {
				let t = res.rows[0] as Token;
				t.isExpired = true;

				this.db.crud.token.update(t);
			}
		});
	}

	protected generateHash(variable: string): string {
		// return variable;
		return crypto.createHash("sha256").update(variable).digest("hex");
	}
}
