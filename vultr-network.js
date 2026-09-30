const MY_VULTR_IP = "198.13.55.216";

const API = "https://ipwho.is/";

$httpClient.get(API, function (error, response, data) {
  if (error) {
    $done({
      title: "网络出口",
      content: "查询失败\n" + error
    });
    return;
  }

  try {
    const info = JSON.parse(data);

    if (info.success === false) {
      throw new Error(info.message || "IP API 返回错误");
    }

    const ip = info.ip || "Unknown";
    const city = info.city || "Unknown";
    const country = info.country || "Unknown";

    const connection = info.connection || {};

    const isp =
      connection.isp ||
      connection.org ||
      "Unknown ISP";

    const asn = connection.asn
      ? "AS" + connection.asn
      : "Unknown ASN";

    const isMyVultr = ip === MY_VULTR_IP;

    const status = isMyVultr
      ? "✓ Vultr Tokyo"
      : "○ 其他网络出口";

    $done({
      title: "网络出口",
      content:
        ip + "\n" +
        city + " · " + country + "\n" +
        isp + " · " + asn + "\n" +
        status
    });

  } catch (e) {
    $done({
      title: "网络出口",
      content: "数据解析失败\n" + e.message
    });
  }
});
