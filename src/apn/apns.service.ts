import { Injectable } from "@nestjs/common";
import apn from '@parse/node-apn'

@Injectable()
export class ApnsService {
    private provider: apn.Provider

    constructor() {
        this.provider = new apn.Provider({
            token: {
                key: process.env.APPLE_APNS_KEY_PATH!,
                keyId: process.env.APPLE_KEY_ID!,
                teamId: process.env.APPLE_TEAM_ID!,
            },
            production: false,
        })
    }

    async sendNotification(
        devideToken: string,
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

        return this.provider.send(note, devideToken)
    }

    async sendSilentDelete(deviceToken: string, notificationId: string){
        const note = new apn.Notification()

        note.topic = process.env.APPLE_BUNDLE_ID!;

        note.contentAvailable = true;

        note.payload = {
            type: 'notification_deleted',
            notificationId,
        };

        return this.provider.send(note, deviceToken);
    }
}