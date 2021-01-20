import Message from "../../objects/message";
import CRUD from "./crud";

export default class MessagesCRUD extends CRUD {
	insert(message: Message) {
		/**
		 * INSERT INTO public."Messages"( id, "contactId", "typeId", content, "time") VALUES (?, ?, ?, ?, ?);
		 */
		let query =
			'INSERT INTO public."Messages"("contactId", "typeId", "content", "time") VALUES (' +
			message.contact_id +
			"," +
			message.type +
			"," +
			message.content +
			"," +
			message.date +
			");";
		return this.connection.execRawQuery(query);
	}

	update(message: Message) {
		/**
		 * UPDATE public."Messages" SET id=?, "contactId"=?, "typeId"=?, content=?, "time"=? WHERE <condition>;
		 */
		let query =
			'UPDATE public."Messages" SET' +
			'contcontactId="' +
			message.contact_id +
			'",' +
			'typeId="' +
			message.type +
			'",' +
			"content=" +
			message.content +
			'",' +
			'time="' +
			message.date +
			'" WHERE id="' +
			message.id +
			'";';
		return this.connection.execRawQuery(query);
	}

	find(where: string) {
		let query = 'SELECT id, "contactId", "typeId", content, "time" FROM public."Messages WHERE ' + where + ";";
		return this.connection.execRawQuery(query);
	}

	select(id: number) {
		/**
		 * SELECT id, "contactId", "typeId", content, "time" FROM public."Messages";
		 */
		return this.find('id="' + id + '"');
		// let query = 'SELECT id, "contactId", "typeId", content, "time" FROM public."Messages WHERE id="' + id + '";';
		// return this.connection.execRawQuery(query);
	}

	selectAll() {
		/**
		 * SELECT id, "contactId", "typeId", content, "time" FROM public."Messages";
		 */
		let query = 'SELECT id, "contactId", "typeId", content, "time" FROM public."Messages";';
		return this.connection.execRawQuery(query);
	}
}
