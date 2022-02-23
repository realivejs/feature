import Koa from "koa";
import proxies from "koa-proxies";

const app = new Koa();
app.use(
  proxies("/wec-counselor-extend-apps", {
    target: "http://iwecloud21:31884/",
    changeOrigin: true,
    logs: true,
  })
);

app.listen(4000, () => {
  console.log("start server");
});
