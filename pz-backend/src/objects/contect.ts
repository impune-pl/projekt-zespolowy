import User from "./user";

// Data class
export default class Contact {
	public id: number;
	public user: User;
	public contact: User;
	public blocked: boolean;
	public share_location: boolean;
	public accepted: boolean;

	// constructor() {
	// 	//this.id = 0;
	// }
}
