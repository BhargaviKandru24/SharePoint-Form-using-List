import { sp, SearchQuery, SearchResults, SPRest, Sort, SearchSuggestQuery, SortDirection } from '@pnp/sp';
import { SPHttpClient, ISPHttpClientOptions } from '@microsoft/sp-http';
import { PageContext } from '@microsoft/sp-page-context';
import { Logger, LogLevel, ConsoleListener } from '@pnp/logging';
import {Field} from '../Models/Field';


export class SearchService  {
    private _spHttpClient: SPHttpClient;
    private _pageContext: PageContext;
    private _localPnPSetup: SPRest;

    public constructor(pageContext: PageContext, spHttpClient: SPHttpClient) {
        this._pageContext = pageContext;
        this._spHttpClient = spHttpClient;

        // Setup the PnP JS instance
        const consoleListener = new ConsoleListener();
        Logger.subscribe(consoleListener);

        // To limit the payload size, we set odata=nometadata
        // We just need to get list items here
        // We use a local configuration to avoid conflicts with other Web Parts
        this._localPnPSetup = sp.configure({
            headers: {
                Accept: 'application/json; odata=nometadata',
            },
        }, this._pageContext.web.absoluteUrl);
    }

    public async getListFields(title): Promise<Array<Field>>{
        var list;
        await this._localPnPSetup.web.lists.getByTitle(title).fields.get().then((data: Array<Field>) => {
            console.log(data);
            list=data;
        });
        return list;

    }
    // public async getListDataById(title, id): Promise<IProductDetails> {
    //     var data;
    //     await this._localPnPSetup.web.lists.getByTitle(title).items.getById(id).get().then((item: IProductDetails) => {
    //         data = item;
    //     });
    //     return data;
    // }

    // public async getListDataByTitle(title, filter: string) {
    //     var data;
    //     await this._localPnPSetup.web.lists.getByTitle(title).items.filter(filter).get().then((item: IProductRegulatory[]) => {
    //         data = item;
    //     });
    //     return data;
    // }

    // public async getUserData(id): Promise<IUser> {
    //     var data;
    //     await this._localPnPSetup.web.siteUsers.getById(id).get().then((result) => {
    //         data = result;
    //     });
    //     return data;
    // }

    // public async getCurrentUser() {
    //     var data;
    //     await this._localPnPSetup.web.currentUser.get().then((result) => {
    //         data = result;
    //     });
    //     return data;
    // }

    // public async getCurrentUserGroups() {
    //     var groups;
    //     var promise = new Promise((resolve, reject) => {
    //         this._localPnPSetup.web.currentUser.groups.get().then((result) => {
    //             groups = result;
    //             return resolve(groups);
    //         });
    //     });
    //     return promise;
    // }

    // public followProduct(userId, productId, follow) {
    //     debugger;
    //     var flowUrl = "https://prod-121.westus.logic.azure.com:443/workflows/951669c820704fb8b5f9a8f5509e59f1/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=gV6S83NuIuPlZCBGafPVnrfgvnVUZMzYNwryAC-0Tqo";
    //     const body = JSON.stringify({
    //         'productId': productId,
    //         'UserId': userId,
    //         'follow': follow
    //     });

    //     const httpClientOptions: ISPHttpClientOptions = {
    //         body: body,
    //         headers: {
    //             "Accept": "application/json;odata=verbose",
    //             "Content-Type": "application/json;odata=verbose",
    //             "odata-version": "3.0",
    //         },
    //         mode: "cors",
    //         method: "POST",
    //         webUrl: this._pageContext.web.serverRelativeUrl
    //     };
    //     debugger;
    //     var promise = new Promise((resolve, reject) => {
    //         this._spHttpClient.post(flowUrl, SPHttpClient.configurations.v1, httpClientOptions).then((response) => {
    //             return resolve(response);
    //         });
    //     });
    //     return promise;
    // }

    // public async getFiles(url) {
    //     debugger;
    //     var promise = new Promise((resolve, reject) => {
    //         var folders, totalResults = 0, fileResults=0, filesList=0;
    //         var files = [];
    //         this._localPnPSetup.web.getFolderByServerRelativeUrl(this._pageContext.web.serverRelativeUrl + url).folders.get().then(r => {
    //             folders = r;
    //             if (folders.length != 0) {
    //                 folders.map((folder) => {

    //                     this._localPnPSetup.web.getFolderByServerRelativeUrl(this._pageContext.web.serverRelativeUrl + url + '/' + folder['Name']).files.get().then((file) => {
    //                         if(file.length == 0)
    //                             filesList = filesList + 1;
    //                         file.map((data) => {
    //                             var fileData = [];
    //                             this._localPnPSetup.web.getFileByServerRelativeUrl(this._pageContext.web.serverRelativeUrl + url + '/' + folder['Name'] + '/' + data['Name']).listItemAllFields.get().then((fileFields) => {
    //                                 fileData.push(data);
    //                                 fileData.push(fileFields);
    //                                 files.push(fileData);
    //                                 debugger;
    //                                 fileResults = fileResults + 1;
    //                                 if (folders.length == totalResults && file.length == fileResults) {
    //                                     fileResults = 0;
    //                                     filesList = filesList + 1;
    //                                     if(folders.length == filesList)
    //                                     resolve(files);
    //                                 }
    //                             });
    //                         });
    //                         totalResults = totalResults + 1;

    //                     });
    //                     return files;
    //                 });
    //             }
    //         });
    //     });

    //     return promise;
    // }

}