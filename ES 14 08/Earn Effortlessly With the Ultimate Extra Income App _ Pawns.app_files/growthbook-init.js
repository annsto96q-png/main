import { loadGrowthBook, setGrowthbookAttributes } from "./growthbook.js?v=1.0.1";
import { getDeviceId } from "./tracking.js";

setGrowthbookAttributes({
  pawns_device_id: getDeviceId(),
  pawns_web_url: window.location.pathname + window.location.search,
  pawns_user_country_code: window.pawnsUserCountryCode || "",
});

loadGrowthBook().then((gb) => {
  const event = new CustomEvent("pawns-growthbook-loaded", {
    detail: gb,
  });

  window.dispatchEvent(event);
});