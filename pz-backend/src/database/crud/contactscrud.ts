import Contact from "../../objects/contect";
import QueryData from "../querydata";
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

		let qd = new QueryData();
		qd.text = 'INSERT INTO public."Contacts"("userId", "contactId", "isLocationShared", "isBlocked", "isAccepted") VALUES ($1, $2, $3, $4, $5)';
		qd.values = [contact.userId, contact.contactId, contact.isLocationShared, contact.isBlocked, contact.isAccepted];
		// let query =
		// 	'INSERT INTO public."Contacts"("userId", "contactId", "isLocationShared", "isBlocked", "isAccepted") VALUES (' +
		// 	contact.user +
		// 	"," +
		// 	contact.contact +
		// 	"," +
		// 	contact.share_location +
		// 	"," +
		// 	contact.blocked +
		// 	"," +
		// 	contact.accepted +
		// 	");";
		// return this.connection.execRawQuery(query);
		return this.connection.execQuery(qd);
	}

	update(contact: Contact) {
		/**
		 * UPDATE public."Contacts" SET id=?, "userId"=?, "contactId"=?, "isLocationShared"=?, "isBlocked"=?, "isAccepted"=? WHERE <condition>;
		 */
		let qd = new QueryData();
		qd.text = 'UPDATE public."Contacts" SET "userId"=$1, "contactId"=$2, "isLocationShared"=$3, "isBlocked"=$4, "isAccepted"=$5 WHERE id=$6';
		qd.values = [contact.userId, contact.contactId, contact.isLocationShared, contact.isBlocked, contact.isAccepted, contact.id];
		// let query =
		// 	'UPDATE public."Contacts" ' +
		// 	'userId="' +
		// 	contact.user +
		// 	'", ' +
		// 	'contactId="' +
		// 	contact.contact +
		// 	'",' +
		// 	'isLocationShared="' +
		// 	contact.share_location +
		// 	'",' +
		// 	'isBlocked="' +
		// 	contact.blocked +
		// 	'",' +
		// 	'isAccepted="' +
		// 	contact.accepted +
		// 	'"' +
		// 	"WHERE id=" +
		// 	contact.id +
		// 	";";
		// return this.connection.execRawQuery(query);
		return this.connection.execQuery(qd);
	}

	find(where: string) {
		let query = 'SELECT id, "userId", "contactId", "isLocationShared", "isBlocked", "isAccepted" FROM public."Contacts" WHERE ' + where + ";";
		return this.connection.execRawQuery(query);
	}

	selectId(id: number) {
		/**
		 * SELECT id, "userId", "contactId", "isLocationShared", "isBlocked", "isAccepted" FROM public."Contacts";
		 */

		let qd = new QueryData();
		qd.text = 'SELECT id, "userId", "contactId", "isLocationShared", "isBlocked", "isAccepted" FROM public."Contacts" WHERE id=$1';
		qd.values = [id];

		return this.connection.execQuery(qd); //this.find('id="' + id + '"');

		// let query = 'SELECT id, "userId", "contactId", "isLocationShared", "isBlocked", "isAccepted" FROM public."Contacts" WHERE id=' + id + ";";
		// return this.connection.execRawQuery(query);
	}

	selectUserId(user_id: number) {
		/**
		 * SELECT id, "userId", "contactId", "isLocationShared", "isBlocked", "isAccepted" FROM public."Contacts";
		 */

		let qd = new QueryData();
		qd.text = 'SELECT id, "userId", "contactId", "isLocationShared", "isBlocked", "isAccepted" FROM public."Contacts" WHERE public."Contacts"."userId"=$1';
		qd.values = [user_id];

		return this.connection.execQuery(qd); //this.find('id="' + id + '"');

		// let query = 'SELECT id, "userId", "contactId", "isLocationShared", "isBlocked", "isAccepted" FROM public."Contacts" WHERE id=' + id + ";";
		// return this.connection.execRawQuery(query);
	}

	selectUserIdDetiled(user_id: number) {
		/**
		 * SELECT id, "userId", "contactId", "isLocationShared", "isBlocked", "isAccepted" FROM public."Contacts";
		 */

		let qd = new QueryData();
		qd.text =
			'SELECT "Contacts".id, "userId", "contactId", "isLocationShared", "isBlocked", "isAccepted", "email", "lastLocation", "lastLocationTimestamp", "lastLoginTimestamp", "phoneNumber" FROM "Contacts" JOIN "Users" ON "Contacts"."contactId"="Users".id WHERE public."Contacts"."userId"=$1';
		qd.values = [user_id];

		return this.connection.execQuery(qd); //this.find('id="' + id + '"');

		// let query = 'SELECT id, "userId", "contactId", "isLocationShared", "isBlocked", "isAccepted" FROM public."Contacts" WHERE id=' + id + ";";
		// return this.connection.execRawQuery(query);
	}

	selectContactId(user_id: number) {
		/**
		 * SELECT id, "userId", "contactId", "isLocationShared", "isBlocked", "isAccepted" FROM public."Contacts";
		 */

		let qd = new QueryData();
		qd.text =
			'SELECT id, "userId", "contactId", "isLocationShared", "isBlocked", "isAccepted" FROM public."Contacts" WHERE public."Contacts"."contactId"=$1';
		qd.values = [user_id];

		return this.connection.execQuery(qd); //this.find('id="' + id + '"');

		// let query = 'SELECT id, "userId", "contactId", "isLocationShared", "isBlocked", "isAccepted" FROM public."Contacts" WHERE id=' + id + ";";
		// return this.connection.execRawQuery(query);
	}

	selectContactUserId(user_id: number, contact_id: number) {
		/**
		 * SELECT id, "userId", "contactId", "isLocationShared", "isBlocked", "isAccepted" FROM public."Contacts";
		 */

		let qd = new QueryData();
		qd.text =
			'SELECT id, "userId", "contactId", "isLocationShared", "isBlocked", "isAccepted" FROM public."Contacts" WHERE public."Contacts"."contactId"=$1 AND  public."Contacts"."userId"=$2';
		qd.values = [contact_id, user_id];

		// console.log(qd.text.replace("$1", qd.values[0]).replace("$2", qd.values[1]));

		return this.connection.execQuery(qd); //this.find('id="' + id + '"');

		// let query = 'SELECT id, "userId", "contactId", "isLocationShared", "isBlocked", "isAccepted" FROM public."Contacts" WHERE id=' + id + ";";
		// return this.connection.execRawQuery(query);
	}

	selectContactUserIDContactNumber(user_id: number, contact_number: number) {
		let qd = new QueryData();
		qd.text = 'SELECT * FROM "Users" JOIN "Contacts" ON "Users".id="Contacts"."contactId" WHERE "Contacts"."userId" = $2 AND "Users"."phoneNumber"= $1 ';
		qd.values = [contact_number, user_id];

		// console.log(qd.text.replace("$1", qd.values[0]).replace("$2", qd.values[1]));

		return this.connection.execQuery(qd); //this.find('id="' + id + '"');
	}

	selectContactUserNumberContactID(user_number: number, contact_id: number) {
		let qd = new QueryData();
		qd.text = 'SELECT * FROM "Users" JOIN "Contacts" ON "Users".id="Contacts"."userId" WHERE "Contacts"."contactId" = $2 AND "Users"."phoneNumber"= $1 ';
		qd.values = [user_number, contact_id];

		// console.log(qd.text.replace("$1", qd.values[0]).replace("$2", qd.values[1]));

		return this.connection.execQuery(qd); //this.find('id="' + id + '"');
	}

	selectAll() {
		/**
		 * SELECT id, "userId", "contactId", "isLocationShared", "isBlocked", "isAccepted" FROM public."Contacts";
		 */

		let query = 'SELECT id, "userId", "contactId", "isLocationShared", "isBlocked", "isAccepted" FROM public."Contacts"';
		return this.connection.execRawQuery(query);
	}

	accept(id: number) {
		let qd = new QueryData();
		qd.text = 'UPDATE public."Contacts" SET "isAccepted"=TRUE WHERE id=$1;';
		qd.values = [id];
		return this.connection.execQuery(qd);
	}

	blockUser(id: number) {
		let qd = new QueryData();
		qd.text = 'UPDATE public."Contacts" SET "isBlocked"=TRUE WHERE id=$1;';
		qd.values = [id];
		return this.connection.execQuery(qd);
	}

	blockLocation(id: number) {
		let qd = new QueryData();
		qd.text = 'UPDATE public."Contacts" SET "isLocationShared"=FALSE WHERE id=$1;';
		qd.values = [id];
		return this.connection.execQuery(qd);
	}

	unlockLocation(id: number) {
		let qd = new QueryData();
		qd.text = 'UPDATE public."Contacts" SET "isLocationShared"=TRUE WHERE id=$1;';
		qd.values = [id];
		return this.connection.execQuery(qd);
	}
}
