import { Client } from "pg";
import ContactsCRUD from "./crud/contactscrud";
import CRUDS from "./crud/cruds";
import MessagesCRUD from "./crud/messagescrud";
import MessageTypesCRUD from "./crud/messagetypescrud";
import TokenCRUD from "./crud/tokencrud";
import UserCRUD from "./crud/usercrud";
import QueryData from "./querydata";

export default class DataBaseConnection {
	protected client: Client;
	protected crud: CRUDS;

	constructor(host: string = "127.0.0.1", port: number = 5432, database: string = "ciat", user: string = "postgres", password: string = "example") {
		this.client = new Client({
			user,
			host,
			database,
			password,
			port,
		});
	}

	connect() {
		this.client
			.connect()
			.then(() => {
				this.setupCRUDs();
			})
			.catch((err) => {
				console.error(err);
			});
	}

	setupCRUDs() {
		this.crud = new CRUDS();
		this.crud.contacts = new ContactsCRUD(this);
		this.crud.message_types = new MessageTypesCRUD(this);
		this.crud.message = new MessagesCRUD(this, this.crud.message_types, this.crud.contacts);
		this.crud.token = new TokenCRUD(this);
		this.crud.user = new UserCRUD(this);
	}

	execRawQuery(query: string) {
		return new Promise((resolve, reject) => {
			this.client.query(query, (error, result) => {
				if (error) {
					reject(error);
				} else {
					resolve(result);
				}
			});
		});
	}

	execQuery(data: QueryData) {
		return new Promise((resolve, reject) => {
			this.client.query(data, (error, result) => {
				if (error) {
					reject(error);
				} else {
					resolve(result);
				}
			});
		});
	}
}
