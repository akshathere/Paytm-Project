import express from "express"
import db from "@repo/db/client"
const app=express()

app.post("/hdfcWebhook", (req, res) => {
    //TODO: Add zod validation here?
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    // Update balance in db, add txn
    try{

    db.$transaction([

    
    db.balance.update({
        where: {
            userId: paymentInformation.userId
        },
        data: {
            amount:{
                increment:paymentInformation.amount
            }
        }
    }),
    db.onRampTransaction.update({
        where:{
            token:paymentInformation.token
        },
        data :{
            status: "success"
        }
    })
])
        res.json({
            msg:"payment successfull"
        })
}catch(e){
    console.log(e);
    res.status(411).send("payment failed")
}
})