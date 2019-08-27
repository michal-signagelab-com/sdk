import {getResource, parseJSONResponse, putResource} from "../../requester";
import DeviceManagement from "../DeviceManagement";
import IOptions from "../../IOptions";
import DeviceVerification from "./DeviceVerification";
import IDeviceVerification, {IDeviceVerificationUpdatable} from "./IDeviceVerification";
import NotFoundError from "../../Error/NotFoundError";

export default class DeviceVerificationManagement {

	private static readonly RESOURCE: string = `${DeviceManagement.RESOURCE}/verification`;

	constructor(private options: IOptions) {
	}

	public async get(deviceVerificationUid: string): Promise<IDeviceVerification> {
		const response = await getResource(this.options, `${DeviceVerificationManagement.RESOURCE}/${deviceVerificationUid}`);

		return new DeviceVerification(await parseJSONResponse(response));
	}

	public async set(settings: IDeviceVerificationUpdatable): Promise<void> {
		const resp = await putResource(this.options, DeviceVerificationManagement.RESOURCE, settings);
		if (resp.status === 404) {
			throw new NotFoundError(resp.status, await parseJSONResponse(resp));
		}
	}

}
