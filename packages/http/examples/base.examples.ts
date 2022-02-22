import { createRequest } from "../src";

const client = createRequest();
client.request("http://localhost:5500/homepage/getCards");
