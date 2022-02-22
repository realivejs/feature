import { createRequest } from "../src";

interface TestResponse {
  rows: Array<string>;
}

interface TestRequest {
  a: 1;
}

test("works with async/await", async () => {
  const client = createRequest({
    baseURL: "http://localhost:4000/wec-counselor-extend-apps",
  });

  const reqeust = await client.get<TestResponse, TestRequest>(
    "homepage/getCards"
  );

  console.log(reqeust.code);

  // expect(reqeust);
});
