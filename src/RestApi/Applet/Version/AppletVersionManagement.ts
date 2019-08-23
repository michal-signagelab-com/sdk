import {getResource, parseJSONResponse, postResource, putResource} from "../../requester";
import IOptions from "../../IOptions";
import AppletManagement from "../AppletManagement";
import IAppletVersion, {IAppletVersionCreatable, IAppletVersionUpdatable} from "./IAppletVersion";
import AppletVersion from "./AppletVersion";
import IAppletVersionFilter, {IAppletVersionListFilter} from "./IAppletVersionFilter";

export default class AppletVersionManagement {

	private static readonly RESOURCE: string = 'version';

	private static getResource(appletUid: string): string {
		return `${AppletManagement.RESOURCE}/${appletUid}/${AppletVersionManagement.RESOURCE}/`;
	}

	private static getUrl(appletUid: string, version: string): string {
		return `${AppletVersionManagement.getResource(appletUid)}${version}/`;
	}

	constructor(private options: IOptions) {
	}

	public async list(appletUid: string, filter: IAppletVersionListFilter = {}): Promise<IAppletVersion[]> {
		const response = await getResource(this.options, AppletVersionManagement.getResource(appletUid), filter);
		const data: IAppletVersion[] = await parseJSONResponse(response);

		return data.map((item: IAppletVersion) => new AppletVersion(item));
	}

	public async get(appletUid: string, version: string, filter: IAppletVersionFilter = {}): Promise<IAppletVersion> {
		const response = await getResource(this.options, AppletVersionManagement.getUrl(appletUid, version), filter);

		return new AppletVersion(await parseJSONResponse(response));
	}

	public async create(appletUid: string, settings: IAppletVersionCreatable): Promise<void> {
		await postResource(this.options, AppletVersionManagement.getResource(appletUid), settings);
	}

	public async update(appletUid: string, version: string, settings: IAppletVersionUpdatable): Promise<void> {
		await putResource(this.options, AppletVersionManagement.getUrl(appletUid, version), settings);
	}

}
