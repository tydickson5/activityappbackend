import apn from '@parse/node-apn';
export declare class ApnsService {
    private provider;
    constructor();
    sendNotification(devideToken: string, payload: {
        notificationId: string;
        title?: string;
        body?: string;
        type: string;
        version?: number;
    }): Promise<apn.Responses<apn.ResponseSent, apn.ResponseFailure>>;
    sendSilentDelete(deviceToken: string, notificationId: string): Promise<apn.Responses<apn.ResponseSent, apn.ResponseFailure>>;
}
