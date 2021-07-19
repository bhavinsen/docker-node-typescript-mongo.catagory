import { Request, Response } from "express";
import Catagory from "../models/catagory.model";
import { PopulateData, TotalAmount } from "../utils";

export const getAllCatagorys = async (req: Request, res: Response) => {
    try {
        let AllCatagorys = await Catagory.find({ root: true });
        AllCatagorys = await PopulateData(AllCatagorys)
        return res.json({ AllCatagorys });
    } catch (error) {
        return res.json({ error });
    }
}


export const setCatagorys = async (req: Request, res: Response) => {
    const { catagoryID, title, price = 0 } = req.body;
    try {
        if (catagoryID) {
            const catagory = await Catagory.findOne({ _id: catagoryID });
            if (!catagory.price) {
                const newSubCatagory = new Catagory({ title, price, root: false });
                await Catagory.findOneAndUpdate({ _id: catagoryID }, { $push: { children: newSubCatagory?._doc?._id } });
                await newSubCatagory.save()
                return res.status(200).json({ newSubCatagory });
            } else {
                return res.status(200).json({ error: "We can't add sub-catagory here!" });
            }
        } else {
            const newCatagory = new Catagory({ title, price, root: true });
            await newCatagory.save()
            return res.status(200).json({ newCatagory });
        }
    } catch ({ error }) {
        return res.status(200).json({ error: error });
    }
}



export const countCatagoryAmount = async (req: Request, res: Response) => {
    const { catagoryID } = req.query;
    const AllData = await Catagory.findOne({ _id: catagoryID, root: true });
    if (AllData) {
        let TotalAmountOfCatagory = await TotalAmount(AllData);
        return res.json({ TotalAmountOfCatagory });
    } else
        return res.json({ error: "This is not valid catagotyID!" });
}



export const updateCatagoryPrice = async (req: Request, res: Response) => {
    const { catagoryID, price } = req.query;

    try {
        if (catagoryID && price) {
            const catagory = await Catagory.findOne({ _id: catagoryID })
            if (!catagory.children.length) {
                const updatedCatagory = await Catagory.findOneAndUpdate({ _id: catagoryID }, { price: price })
                return res.status(200).json({ updatedCatagory })
            }
            return res.status(200).json({ error: "We can't change price here!" })
        }
        return res.status(403).json({ error: "catagoryID, price both are required" })
    } catch (error) {
        return res.status(403).json({ error })
    }
}