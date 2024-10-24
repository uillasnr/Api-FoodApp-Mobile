import serviceCategory from "../services/serviceCategory.js";


async function getCategory(req, res) {
    try {
        const Category = await serviceCategory.List();

        res.status(200).json(Category);
    } catch (error) {
        res.status(500).json({ error });
    }
}

export default { getCategory };