import { URLs } from "../Models/url.js";

export const RedirectURL = async (req, res) => {
  const { shortId } = req.params;

  try {
    const resURLs = await URLs.find({ shortId: shortId });
    const element = resURLs[0];
    res.redirect(element.longURL);
  } catch (err) {
    res.stats(500).json({
      ok: false,
    });
  }
};
