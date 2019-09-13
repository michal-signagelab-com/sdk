import IApplet from "./IApplet";

export default class Applet implements IApplet {

	// public readonly [P in keyof IApplet]: IApplet[P]; // Generalized TS doesn't support
	public readonly uid: IApplet['uid'];
	public readonly name: IApplet['name'];
	public readonly createdAt: IApplet['createdAt'];

	constructor(data: IApplet) {
		for (const key in data) {
			// @ts-ignore copy all values
			this[key] = data[key];
		}
	}
}
