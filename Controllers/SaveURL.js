import { URLs } from "../Models/url.js";
import { generateShortId } from "../Utils/Keys.js";

export const SaveURL = async (req, res) => {
  const { longURL } = req.body;

  try {
    const shortId = generateShortId(7);
    const newURL = new URLs({ longURL: longURL, shortId: shortId });
    await newURL.save();
    const shortURL = `http://localhost:5050/${shortId}`;
    res.status(200).json({
      ok: true,
      shortURL: shortURL,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
    });
  }
};
