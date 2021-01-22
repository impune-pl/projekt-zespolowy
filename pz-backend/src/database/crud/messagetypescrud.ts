import MessageTypes from "../../objects/messagetypes";
import QueryData from "../querydata";
import CRUD from "./crud";

export default class MessageTypesCRUD extends CRUD {
	insert(mt: MessageTypes) {
		/**
		 * INSERT INTO public."MessageTypes"(id, type) VALUES (?, ?);
		 */
		let qd = new QueryData();
		qd.text = 'INSERT INTO public."MessageTypes"(type) VALUES ($1)';
		qd.values = [mt.type];
		return this.connection.execQuery(qd);
		// let query = 'INSERT INTO public."MessageTypes" (type) VALUES (' + mt.type + ");";
		// return this.connection.execRawQuery(query);
	}

	update(mt: MessageTypes) {
		/**
		 * UPDATE public."MessageTypes" SET id=?, type=? WHERE <condition>;
		 */
		let qd = new QueryData();
		qd.text = 'UPDATE public."MessageTypes" SET type=$1 WHERE id=$2';
		qd.values = [mt.type, mt.id];
		return this.connection.execQuery(qd);

		// let query = 'UPDATE public."MessageTypes" SET type="' + mt.type + '" WHERE id="' + mt.id + '";';
		// return this.connection.execRawQuery(query);
	}

	find(where: string) {
		let query = 'SELECT id, type FROM public."MessageTypes" WHERE ' + where + ";";
		return this.connection.execRawQuery(query);
	}

	select(id: number) {
		/**
		 * SELECT id, type FROM public."MessageTypes";
		 */

		let qd = new QueryData();
		qd.text = 'SELECT id, type FROM public."MessageTypes" WHERE id=$2';
		qd.values = [id];
		return this.connection.execQuery(qd);

		// return this.find('id="' + id + '"');
		// let query = 'SELECT id, type FROM public."MessageTypes" WHERE id="' + id + '";';
		// return this.connection.execRawQuery(query);
	}

	selectAll() {
		/**
		 * SELECT id, type FROM public."MessageTypes";
		 */
		let query = 'SELECT id, type FROM public."MessageTypes";';
		return this.connection.execRawQuery(query);
	}
}
