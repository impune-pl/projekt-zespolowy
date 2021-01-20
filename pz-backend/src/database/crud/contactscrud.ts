import Contact from "../../objects/contect";
import CRUD from "./crud";

/**
 * pamietaj ze tutaj dodajesz tylko jeden kontakt z pary, ten ktory prosi o dodanie.
 * To sie wtedy musi pojawic jako prosba u kontaktu docelowego i po zaakceptowaniu
 * (akutualizacji pola isAccepted na true) baza tworzy nowy kontakt z odwroconymi
 * polami userId i contactId sama.
 */

export default class ContactsCRUD extends CRUD {
	insert(contact: Contact) {
		/**
		 * INSERT INTO public."Contacts"(id, "userId", "contactId", "isLocationShared", "isBlocked", "isAccepted") VALUES (?, ?, ?, ?, ?, ?);
		 */
		let query =
			'INSERT INTO public."Contacts"("userId", "contactId", "isLocationShared", "isBlocked", "isAccepted") VALUES (' +
			contact.user +
			"," +
			contact.contact +
			"," +
			contact.share_location +
			"," +
			contact.blocked +
			"," +
			contact.accepted +
			");";
		return this.connection.execRawQuery(query);
	}

	update(contact: Contact) {
		/**
		 * UPDATE public."Contacts" SET id=?, "userId"=?, "contactId"=?, "isLocationShared"=?, "isBlocked"=?, "isAccepted"=? WHERE <condition>;
		 */
		let query =
			'UPDATE public."Contacts" ' +
			'userId="' +
			contact.user +
			'", ' +
			'contactId="' +
			contact.contact +
			'",' +
			'isLocationShared="' +
			contact.share_location +
			'",' +
			'isBlocked="' +
			contact.blocked +
			'",' +
			'isAccepted="' +
			contact.accepted +
			'"' +
			"WHERE id=" +
			contact.id +
			";";
		return this.connection.execRawQuery(query);
	}

	find(where: string) {
		let query = 'SELECT id, "userId", "contactId", "isLocationShared", "isBlocked", "isAccepted" FROM public."Contacts" WHERE ' + where + ";";
		return this.connection.execRawQuery(query);
	}

	select(id: number) {
		/**
		 * SELECT id, "userId", "contactId", "isLocationShared", "isBlocked", "isAccepted" FROM public."Contacts";
		 */
		return this.find('id="' + id + '"');

		// let query = 'SELECT id, "userId", "contactId", "isLocationShared", "isBlocked", "isAccepted" FROM public."Contacts" WHERE id=' + id + ";";
		// return this.connection.execRawQuery(query);
	}

	selectAll() {
		/**
		 * SELECT id, "userId", "contactId", "isLocationShared", "isBlocked", "isAccepted" FROM public."Contacts";
		 */

		let query = 'SELECT id, "userId", "contactId", "isLocationShared", "isBlocked", "isAccepted" FROM public."Contacts";';
		return this.connection.execRawQuery(query);
	}
}
