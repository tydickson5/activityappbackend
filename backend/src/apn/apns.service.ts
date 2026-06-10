import { Injectable } from "@nestjs/common";
import apn from '@parse/node-apn'

@Injectable()
export class ApnsService {
    private productionProvider: apn.Provider
    private sandboxProvider: apn.Provider
    constructor() {


        this.productionProvider = new apn.Provider({
            token: {
                key: process.env.APPLE_APNS_KEY || process.env.APPLE_APNS_KEY_PATH!!,
                keyId: process.env.APPLE_KEY_ID!,
                teamId: process.env.APPLE_TEAM_ID!,
            },
            production: true, 
        })
        this.sandboxProvider = new apn.Provider({
            token: {
                key: process.env.APPLE_APNS_KEY || process.env.APPLE_APNS_KEY_PATH!!,
                keyId: process.env.APPLE_KEY_ID!,
                teamId: process.env.APPLE_TEAM_ID!,
            },
            production: false, 
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

        console.log("BUNDLE:", process.env.APPLE_BUNDLE_ID)
        console.log("TEAM:", process.env.APPLE_TEAM_ID)
        console.log("KEY:", process.env.APPLE_KEY_ID)
        console.log(
        "P8 exists:",
        !!process.env.APPLE_APNS_KEY || !!process.env.APPLE_APNS_KEY_PATH
        )

        console.log("Sending via PRODUCTION")

        console.log("Trying SANDBOX first")
        const sandboxResult = await this.sandboxProvider.send(note, deviceToken)
        console.log("SANDBOX RESULT:", JSON.stringify(sandboxResult, null, 2))

        if (sandboxResult.sent?.length) {
            console.log("SUCCESS via SANDBOX — token is a development token")
            return sandboxResult
        }


        console.log("Trying PRODUCTION")
        const productionResult = await this.productionProvider.send(note, deviceToken)
        console.log("PRODUCTION RESULT:", JSON.stringify(productionResult, null, 2))
        return productionResult
    }

    

    async sendSilentDelete(deviceToken: string, notificationId: string){
        const note = new apn.Notification()

        note.topic = process.env.APPLE_BUNDLE_ID!;

        note.contentAvailable = true;

        note.payload = {
            type: 'notification_deleted',
            notificationId,
        };

        const result = await this.productionProvider.send(note, deviceToken);

        console.log("APNS RESULT:", JSON.stringify(result, null, 2));

        if (result.failed.length) {
            console.error("APNS FAILED:", result.failed);
        }

        return result;
    }
}