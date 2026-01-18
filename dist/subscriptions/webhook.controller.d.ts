import { RawBodyRequest } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
export declare class WebhookController {
    private readonly subscriptionsService;
    constructor(subscriptionsService: SubscriptionsService);
    handleStripeWebhook(req: RawBodyRequest<Request>, signature: string): Promise<{
        received: boolean;
    }>;
}
