// Data class
export default class Token {
	public id: number;
	public userId: number;
	public token: string;
	public expirationTimestamp: Date;
	public generatedTimestamp: Date;
	public isExpired: boolean;
}
