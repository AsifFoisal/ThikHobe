import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'

export async function POST() {
    try {
        const headersList = await headers()
        const origin =
            headersList.get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL

        if (!origin) {
            return NextResponse.json(
                { error: 'Unable to determine the site origin.' },
                { status: 400 }
            )
        }

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    price: 'price_1UdWYFAIvmTcFEFV8UXAym2O',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/payment/cancel`,
        });
        if (!session.url) {
            return NextResponse.json(
                { error: 'Stripe did not return a Checkout URL.' },
                { status: 502 }
            )
        }
        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        const error = err as { message: string; statusCode?: number }
        return NextResponse.json(
            { error: error.message },
            { status: error.statusCode || 500 }
        )
    }
}