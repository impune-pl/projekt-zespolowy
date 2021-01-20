import { Client } from "pg";
import ContactsCRUD from "./crud/contactscrud";
import CRUD from "./crud/crud";
import CRUDS from "./crud/cruds";
import MessagesCRUD from "./crud/messagescrud";
import MessageTypesCRUD from "./crud/messagetypescrud";
import TokenCRUD from "./crud/tokencrud";
import UserCRUD from "./crud/usercrud";

export default class DataBaseConnection {
	client: Client;
	crud: CRUDS;

	constructor() {
		this.client = new Client();
	}

	connect() {
		this.client.connect();
		this.setupCRUDs();
	}

	setupCRUDs() {
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
}
