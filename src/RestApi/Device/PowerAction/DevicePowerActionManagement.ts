import {getResource, parseJSONResponse, putResource} from "../../requester";
import DeviceManagement from "../DeviceManagement";
import IOptions from "../../IOptions";
import IPowerAction, {IPowerActionUpdatable} from "./IPowerAction";
import PowerAction from "./PowerAction";

export default class DevicePowerActionManagement {

	private static getUrl(deviceUid: string): string {
		return `${DeviceManagement.RESOURCE}/${deviceUid}/power-action`;
	}

	constructor(private options: IOptions) {
	}

	public async get(deviceUid: string): Promise<IPowerAction[]> {
		const response = await getResource(this.options, DevicePowerActionManagement.getUrl(deviceUid));
		const data: IPowerAction[] = await parseJSONResponse(response);

		return data.map((item: IPowerAction) => new PowerAction(item));
	}

	public async set(deviceUid: string, settings: IPowerActionUpdatable): Promise<void> {
		await putResource(this.options, DevicePowerActionManagement.getUrl(deviceUid), settings);
	}

}
