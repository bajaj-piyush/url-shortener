const shortid = require("shortid");
const Url = require("../models/url");

async function handleGenerateShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "No url provided!" });
  const Id = shortid();

  await Url.create({
    shortId: Id,
    redirectUrl: body.url,
    visitsHistory: [],
    createdBy: req.user._id,
  });

  const allurls = await Url.find({ createdBy: req.user._id });

  return res.render("home", { id: Id, urls: allurls });
}

async function handleAnalytics(req, res) {
  const Id = req.params.shortID;
  const result = await Url.findOne({ shortId: Id });

  return res.json({
    TotalClicks: result?.visitsHistory.length,
    Analytics: result?.visitsHistory,
  });
}

module.exports = {
  handleGenerateShortUrl,
  handleAnalytics,
};
