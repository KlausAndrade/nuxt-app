import { getCookie, setCookie } from 'h3';

export default defineEventHandler(async (event) => {
    const { method } = event.node.req;

    if (method === 'GET') {
        const language = getCookie(event, 'language') || 'en';
        return { language };
    } else if (method === 'POST') {
        const body = await readBody(event);
        const newLanguage = body.language;
        const ONE_YEAR = 365 * 24 * 60 * 60;
        setCookie(event, 'language', newLanguage, {
            httpOnly: true,
            path: '/',
            maxAge: ONE_YEAR,
        });

        return { success: true };
    }
});