import { URLs } from "../Models/url.js";
import { setCache, getCache } from "../Utils/redis.js";

export const RedirectURL = async (req, res) => {
  const { shortId } = req.params;

  try {
    const URLFromCache = await getCache(shortId);
    if (URLFromCache) {
      res.redirect(JSON.parse(URLFromCache));
      return;
    }
    const resURLs = await URLs.find({ shortId: shortId });
    const element = resURLs[0];
    await setCache(shortId, element.longURL, 7200);
    res.redirect(element.longURL);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
    });
  }
};
