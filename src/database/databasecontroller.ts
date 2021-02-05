import DataBaseConnection from "./databaseconnection";
import Contact from "../objects/contect";
import Message from "../objects/message";
import Token from "../objects/token";
import User from "../objects/user";
import * as pg from "pg";
import DetiledContact from "../objects/detiledcontact";
import QueryData from "./querydata";

export default class DataBaseController extends DataBaseConnection {
	constructor(host: string = undefined, port: number = undefined, database: string = undefined, user: string = undefined, password: string = undefined) {
		super(host, port, database, user, password);
	}

	// LOGIN

	checkLoginData(number: number, password: string) {
		return new Promise((resolve, reject) => {
			this.getUserByNumber(number)
				.then((users: pg.QueryResult) => {
					// console.log({ users, rows: users.rows });
					if (users.rowCount === 1) {
						let u = users.rows[0] as User;

						if (u.passwordHash === password) {
							u.lastLoginTimestamp = new Date();
							this.crud.user.update(u);
							resolve(true);
						} else {
							reject("Invalid password");
						}
					} else {
						reject("User does not exists");
					}
				})
				.catch((error) => {
					console.error({ "DATABASE ERROR": error });
					reject(error);
				});
		});
	}

	checkLoginDataWithToken(token: string) {
		return new Promise((resolve, reject) => {
			this.crud.token
				.selectToken(token)
				.then((token: pg.QueryResult) => {
					if (token.rowCount > 0) {
						let t = token.rows[0] as Token;
						this.crud.token
							.check()
							.then(() => {
								if (t.isExpired) {
									resolve(false);
								} else {
									this.crud.user
										.select(t.userId)
										.then((res: pg.QueryResult) => {
											if (res.rowCount > 0) {
												let user = res.rows[0] as User;
												user.lastLoginTimestamp = new Date();
												this.crud.user.update(user);
												user.passwordHash = "";
												resolve(user);
											} else {
												reject("User does not exist");
											}
										})
										.catch((err) => {
											reject(err);
										});
								}
							})
							.catch((err) => {
								reject(err);
							});
					} else {
						reject("Token Does not exist");
					}
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	// USER

	addUser(user: User) {
		return this.crud.user.insert(user);
	}
	updateUserData(user: User) {
		return this.crud.user.update(user);
	}
	getUser(id: number) {
		return this.crud.user.select(id);
	}
	getUserByNumber(number: number) {
		return this.crud.user.selectNumber(number.toString());
	}
	blockUser(contact_id: number) {
		return new Promise((resolve, reject) => {
			this.crud.contacts
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
	getUserData(user_id: number) {
		return new Promise((resolve, reject) => {
			this.crud.user
				.select(user_id)
				.then((res: pg.QueryResult) => {
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

	// CONTACT

	unlockUser(contact_id: number) {
		return new Promise((resolve, reject) => {
			this.crud.contacts
				.unlockUser(contact_id)
				.then((contact: pg.QueryResult) => {
					// console.log({ contact });
					resolve(contact.rowCount == 1);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
	isUserBlocekd(user_id: number, target_id: number) {
		return new Promise((resolve, reject) => {
			this.crud.contacts
				.selectContactUserId(target_id, user_id)
				.then((contact: pg.QueryResult) => {
					if (contact.rowCount > 0) resolve((contact.rows[0] as Contact).isBlocked);
					else resolve(true);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	getLocation(user_id: number) {
		return new Promise((resolve, reject) => {
			this.crud.user
				.select(user_id)
				.then((user: pg.QueryResult) => {
					if (user.rowCount > 0) resolve((user.rows[0] as User).lastLocation);
					else resolve(null);
				})
				.catch((err) => {
					console.error(err);
					reject(err);
				});
		});
	}
	disableLocation(contact_id: number) {
		return new Promise((resolve, reject) => {
			this.crud.contacts
				.blockLocation(contact_id)
				.then((contact: pg.QueryResult) => {
					resolve(contact.rowCount == 1);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
	enableLocation(contact_id: number) {
		return new Promise((resolve, reject) => {
			this.crud.contacts
				.unlockLocation(contact_id)
				.then((contact: pg.QueryResult) => {
					resolve(contact.rowCount == 1);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
	canGetLocation(id: number, target_id: number) {
		return new Promise((resolve, reject) => {
			this.crud.contacts
				.selectContactUserId(target_id, id)
				.then((contact: pg.QueryResult) => {
					if (contact.rowCount > 0) resolve((contact.rows[0] as Contact).isLocationShared);
					else resolve(false);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
	checkIfInvitationExists(user_id: number, contact_number: number) {
		return new Promise((resolve, reject) => {
			this.crud.contacts
				.selectContactUserNumberContactID(contact_number, user_id)
				.then((contact: pg.QueryResult) => {
					resolve(contact.rowCount > 0);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
	acceptInvitation(contact_id: number) {
		return new Promise((resolve, reject) => {
			this.crud.contacts
				.accept(contact_id)
				.then((res: pg.QueryResult) => {
					resolve(res.rowCount == 1);
				})
				.catch((err) => {
					console.error({ accept_invitation: err });
					reject(err);
				});
		});
	}
	dismissInvitation(contact_id: number) {
		return new Promise((resolve, reject) => {
			this.crud.contacts
				.dismiss(contact_id)
				.then((res: pg.QueryResult) => {
					resolve(res.rowCount == 1);
				})
				.catch((err) => {
					console.error({ dismiss_invitation: err });
					reject(err);
				});
		});
	}
	getFriendsList(id: number) {
		return new Promise((resolve, reject) => {
			this.crud.contacts
				.selectUserIdDetiled(id)
				.then((contacts: pg.QueryResult) => {
					let cts: DetiledContact[] = [];
					contacts.rows.forEach((row) => {
						let dc = new DetiledContact();
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

	updateContact(contact: Contact) {
		return this.crud.contacts.update(contact);
	}
	getContact(id: number) {
		return this.crud.contacts.selectId(id);
	}
	getContacts(id: number) {
		return this.crud.contacts.find('public."Contacts".userID=' + id);
		// return [];
	}
	addContact(contact: Contact) {
		return this.crud.contacts.insert(contact);
	}
	findContactByMail(email: string) {
		return new Promise((resolve, reject) => {
			this.crud.user
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
	findContactByNumber(number: number) {
		return new Promise((resolve, reject) => {
			this.crud.user
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
	getContactPair(user_id: number, contact_id: number) {
		return new Promise((resolve, reject) => {
			this.crud.contacts
				.selectPairByUsersId(user_id, contact_id)
				// .find("phoneNumber=" + number + " ")
				.then((pair: pg.QueryResult) => {
					resolve(pair.rows);
				})
				.catch((err) => {
					console.error({ contact_pair: err });
					reject(err);
				});
		});
	}

	// MESSAGES

	getMessages(contact_id: number, from_id: number) {
		return new Promise((resolve, reject) => {
			this.crud.message
				.selectAllForContactFromMessageId(contact_id, from_id)
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
			this.crud.message
				.selectAllForContact(contact_id)
				.then((messages: pg.QueryResult) => {
					// console.log({ messages, rows: messages.rows });
					resolve(messages.rows);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
	addMessage(message: Message) {
		return this.crud.message.insert(message);
	}
	checkForNewMessages(contact_id: number, last_message_id: number) {
		return new Promise((resolve, reject) => {
			// let where = "contact_id=" + contact_id + " and id>" + last_message_id + " ";
			this.crud.message
				.checkForNew(contact_id, last_message_id)
				// .find(where)
				.then((messages: pg.QueryResult) => {
					// console.log(messages);
					resolve(messages.rowCount > 0);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
	getMessageTypes() {
		return new Promise((resolve, reject) => {
			this.crud.message_types
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
	// TOKEN

	removeToken(token: string) {
		this.crud.token.selectToken(token).then((res: pg.QueryResult) => {
			if (res.rowCount > 0) {
				let t = res.rows[0] as Token;
				t.isExpired = true;

				this.crud.token.update(t);
			}
		});
	}
	insertToken(token: Token) {
		return this.crud.token.insert(token);
	}
	checkTokens() {
		return this.crud.token.check();
	}
}
