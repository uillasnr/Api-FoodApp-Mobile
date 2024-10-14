import serviceBanner from "../services/serviceBanner.js";

async function List(req, res) {
  try {
    const banners = await serviceBanner.List();

    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ error });
  }
}

export default { List };
