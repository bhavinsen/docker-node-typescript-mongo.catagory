import Catagory from "../models/catagory.model";

type catagory = {
    _id: String;
    title: String;
    children: [];
    price: Number;
}

export const findCatagoryWithHierarchy = (catagoryData: catagory) => new Promise(async (Resolve, Reject) => {
    if (catagoryData?.children?.length) {
        for (let cat in catagoryData?.children) {
            const data = await Catagory.findOne({ _id: catagoryData?.children?.[cat] });
            const dat: any = await findCatagoryWithHierarchy(data);
            (catagoryData.children as any)[cat] = dat
        }
    }
    Resolve(catagoryData);
});

export const PopulateData = (AllData: catagory[]) => new Promise(async (Resolve, Reject) => {
    for (let cat in AllData) {
        const dat: any = await findCatagoryWithHierarchy(AllData[cat])
        AllData[cat] = dat
    }
    Resolve(AllData)
});
let totalAmount = 0;

const TotalAmountHelper = async (data: any) => {
    if (data?.children?.length) {
        for (let cat in data?.children) {
            const dat: any = await TotalAmountHelper(data?.children[cat]);
            // (data.children as any)[cat] = dat
        }
    } else {
        totalAmount = (data.price || 0) + totalAmount;
    }
    return totalAmount;
}


export const TotalAmount = async (AllData: catagory) => {
    let AllCatagorys: [] | any = await PopulateData([AllData]);
    const TotalAmount: number | any = await TotalAmountHelper(AllCatagorys[0]);
    totalAmount = 0;
    return TotalAmount
}

