// Data class
export default class Token {
	public id: number;
	public user_id: number;
	public token: string;
	public expire_date: string;
	public generated_date: string;
	public is_expired: boolean;
}
