/* eslint-disable @typescript-eslint/no-unused-vars */

import "dotenv/config";

class Helper {

	static getEmailEnvironmentVariable(){
		return process.env.EMAIL;
	}

	static getEmailPasswordEnvironmentVariable(){
		return process.env.EMAIL_PASSWORD;
	}

	static getRabbitURIEnvironmentVariable(){
		return process.env.RABBIT_URI;
	}
}

export default Helper;