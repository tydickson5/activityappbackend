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

    async sendNotification(deviceToken: string, payload: any) {

        const note = new apn.Notification()
        note.topic = process.env.APPLE_BUNDLE_ID!

        note.alert = {
            title: payload.title ?? '',
            body: payload.body ?? '',
        }

        note.sound = 'default'
        note.payload = payload

        console.log("Sending via PRODUCTION")

        let result = await this.productionProvider.send(note, deviceToken)

        console.log("PRODUCTION RESULT:", JSON.stringify(result, null, 2))

        if (result.failed?.length) {
            console.log("Retrying via SANDBOX")

            const sandboxResult = await this.sandboxProvider.send(note, deviceToken)

            console.log("SANDBOX RESULT:", JSON.stringify(sandboxResult, null, 2))

            return sandboxResult
        }

        return result
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