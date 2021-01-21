import Message from "../../objects/message";
import QueryData from "../querydata";
import CRUD from "./crud";
import * as pg from "pg";
import Contact from "../../objects/contect";

export default class MessagesCRUD extends CRUD {
	insert(message: Message) {
		/**
		 * INSERT INTO public."Messages"( id, "contactId", "typeId", content, "time") VALUES (?, ?, ?, ?, ?);
		 */
		let qd = new QueryData();
		qd.text = 'INSERT INTO public."Messages"("contactId", "typeId", "content", "time") VALUES ($1, $2, $3, $4)';
		qd.values = [message.contact_id, message.type, message.content, message.date];
		// let query =
		// 	'INSERT INTO public."Messages"("contactId", "typeId", "content", "time") VALUES (' +
		// 	message.contact_id +
		// 	"," +
		// 	message.type +
		// 	"," +
		// 	message.content +
		// 	"," +
		// 	message.date +
		// 	");";
		// return this.connection.execRawQuery(query);
		return this.connection.execQuery(qd);
	}

	update(message: Message) {
		/**
		 * UPDATE public."Messages" SET id=?, "contactId"=?, "typeId"=?, content=?, "time"=? WHERE <condition>;
		 */
		let qd = new QueryData();
		qd.text = 'UPDATE public."Messages" SET "contactId"=$1, "typeId"=$2, content=$3, "time"=$4 WHERE id=$5';
		qd.values = [message.contact_id, message.type, message.content, message.date, message.id];
		// let query =
		// 	'UPDATE public."Messages" SET' +
		// 	'contcontactId="' +
		// 	message.contact_id +
		// 	'",' +
		// 	'typeId="' +
		// 	message.type +
		// 	'",' +
		// 	"content=" +
		// 	message.content +
		// 	'",' +
		// 	'time="' +
		// 	message.date +
		// 	'" WHERE id="' +
		// 	message.id +
		// 	'";';
		// return this.connection.execRawQuery(query);
		return this.connection.execQuery(qd);
	}

	find(where: string) {
		let query = 'SELECT id, "contactId", "typeId", content, "time" FROM public."Messages WHERE ' + where + ";";
		return this.connection.execRawQuery(query);
	}

	selectId(id: number) {
		/**
		 * SELECT id, "contactId", "typeId", content, "time" FROM public."Messages";
		 */

		let qd = new QueryData();
		qd.text = 'SELECT id, "contactId", "typeId", content, "time" FROM public."Messages" WHERE id=$1';
		qd.values = [id];

		return this.connection.execQuery(qd);

		// return this.find('id="' + id + '"');
		// let query = 'SELECT id, "contactId", "typeId", content, "time" FROM public."Messages WHERE id="' + id + '";';
		// return this.connection.execRawQuery(query);
	}

	selectContactId(id: number) {
		/**
		 * SELECT id, "contactId", "typeId", content, "time" FROM public."Messages";
		 */

		let qd = new QueryData();
		qd.text = 'SELECT id, "contactId", "typeId", content, "time" FROM public."Messages" WHERE contactId=$1';
		qd.values = [id];

		return this.connection.execQuery(qd);

		// return this.find('id="' + id + '"');
		// let query = 'SELECT id, "contactId", "typeId", content, "time" FROM public."Messages WHERE id="' + id + '";';
		// return this.connection.execRawQuery(query);
	}

	selectAllForUsers(user_id: number, contact_id: number) {
		let qd = new QueryData();
		qd.text =
			'SELECT "Messages".content as "content", "Messages".time as "sentAt", "Contacts"."userId" as "sender", "MessageTypes"."type"' +
			'FROM "Messages", "Contacts", "MessageTypes" ' +
			'WHERE  "Messages"."contactId" = "Contacts"."id" ' +
			'AND "MessageTypes".id = "Messages"."typeId" ' +
			'AND (("Contacts"."userId" = $1 AND "Contacts"."contactId"=$2) ' +
			'OR ("Contacts"."userId" = $2 AND "Contacts"."contactId"=$1)) ' +
			'ORDER BY "Messages".time DESC';
		qd.values = [user_id, contact_id];
		return this.connection.execQuery(qd);
	}

	selectAllForContact(id: number) {
		return new Promise((resolve, reject) => {
			this.connection.crud.contacts
				.selectId(id)
				.then((contact: pg.QueryResult) => {
					if (contact.rowCount === 1) {
						let con = contact.rows[0] as Contact;
						resolve(this.selectAllForUsers(con.userId, con.contactId));
					} else {
						reject("Wrong contact id");
					}
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	selectAll() {
		/**
		 * SELECT id, "contactId", "typeId", content, "time" FROM public."Messages";
		 */
		let query = 'SELECT id, "contactId", "typeId", content, "time" FROM public."Messages";';
		return this.connection.execRawQuery(query);
	}

	checkForNew(contact_id: number, last_id: number) {
		let qd = new QueryData();
		qd.text =
			'SELECT id, "contactId", "typeId", content, "time" FROM public."Messages" WHERE public."Messages".id>$1 AND public."Messages"."contactId"=$2;';
		qd.values = [last_id, contact_id];
		return this.connection.execQuery(qd);
	}
}
