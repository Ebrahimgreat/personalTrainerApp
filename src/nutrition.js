import { Hono } from "hono";
const nutrition = new Hono();
nutrition.get('/', (c) => {
    return c.json('Hello it is your app');
});
