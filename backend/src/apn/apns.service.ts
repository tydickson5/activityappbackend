import { Injectable } from "@nestjs/common";
import apn from '@parse/node-apn'

@Injectable()
export class ApnsService {
    private sandboxProvider: apn.Provider
    private productionProvider: apn.Provider

    constructor() {
        this.sandboxProvider = new apn.Provider({
            token: {
                key: process.env.APPLE_APNS_KEY_PATH!,
                keyId: process.env.APPLE_KEY_ID!,
                teamId: process.env.APPLE_TEAM_ID!,
            },
            production: false, 
        })

        this.productionProvider = new apn.Provider({
            token: {
                key: process.env.APPLE_APNS_KEY_PATH!,
                keyId: process.env.APPLE_KEY_ID!,
                teamId: process.env.APPLE_TEAM_ID!,
            },
            production: true, 
        })
    }

    async sendNotification(
        deviceToken: string,
        payload: {
            notificationId: string;
            title?: string;
            body?: string;
            type: string;
            version?: number;
        },
    ) {
        const note = new apn.Notification();

        note.topic = process.env.APPLE_BUNDLE_ID!;

        if (payload.title || payload.body) {
            note.alert = {
                title: payload.title ?? '',
                body: payload.body ?? '',
            };
        }

        note.sound = 'default';

        //collapseable

        note.collapseId = payload.notificationId;

        note.payload = {
            notificationId: payload.notificationId,
            type: payload.type,
            version: payload.version || 1,
        }

        const result = await this.productionProvider.send(note, deviceToken)

        if (result.failed.length) {
            const reason = result.failed[0]?.response?.reason

            if (reason === "BadEnvironmentKeyInToken") {
            return this.sandboxProvider.send(note, deviceToken)
            }
        }

        console.log(
            "APNS RESULT",
            JSON.stringify(result, null, 2)
        );

        return result;
    }

    async sendSilentDelete(deviceToken: string, notificationId: string){
        const note = new apn.Notification()

        note.topic = process.env.APPLE_BUNDLE_ID!;

        note.contentAvailable = true;

        note.payload = {
            type: 'notification_deleted',
            notificationId,
        };

        const result = await this.productionProvider.send(note, deviceToken)

        if (result.failed.length) {
            const reason = result.failed[0]?.response?.reason

            if (reason === "BadEnvironmentKeyInToken") {
            return this.sandboxProvider.send(note, deviceToken)
            }
        }

        console.log(
            "APNS RESULT",
            JSON.stringify(result, null, 2)
        );

        return result;
    }
}