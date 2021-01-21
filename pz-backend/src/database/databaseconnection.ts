import { Client } from "pg";
import ContactsCRUD from "./crud/contactscrud";
import CRUD from "./crud/crud";
import CRUDS from "./crud/cruds";
import MessagesCRUD from "./crud/messagescrud";
import MessageTypesCRUD from "./crud/messagetypescrud";
import TokenCRUD from "./crud/tokencrud";
import UserCRUD from "./crud/usercrud";
import QueryData from "./querydata";

export default class DataBaseConnection {
	client: Client;
	crud: CRUDS;

	constructor() {
		this.client = new Client({
			user: "postgres",
			host: "127.0.0.1",
			database: "ciat",
			password: "example",
			port: 5432,
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
		this.crud.message = new MessagesCRUD(this);
		this.crud.message_types = new MessageTypesCRUD(this);
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
