const mongoose=require('mongoose');
const express=require('express');
const bodyParser=require('body-parser');
var objectID = require('mongoose').Types.ObjectId;

mongoose.connect('mongodb://localhost/CURD',{ useUnifiedTopology: true,useNewUrlParser: true })
.then(()=>console.log('Connection successfull......'))
.catch((err)=>console.error('Error in conncetion...'))
const app=express();

app.use(bodyParser.json())
const schema=new mongoose.Schema({
    first_name:{type:String, required:true} ,
    middle_name:{
        type:String,
        // lowercase:true,
        uppercase:true,
        //enum:['manju','amar','anand'],
        required:true,
        trim:true
    },
    last_name:String,
    phone:Number,
    address:[String],
    date:{type:Date, default:Date.now},
    Gname:Boolean,
    price:{
        type:Number,
        min:10,
        max:20,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
})

const Sam=mongoose.model('MaS',schema);

app.listen(4100,()=>console.log('Listing to port 4100...'))

//Create
async function createDate(){
    const c=new Sam({
        first_name:'SaM',
        middle_name:'Amar',
        last_name:'Hubballi',
        phone:9611323824,
        address:['manjunath nagar','Rajajinaagr'],
        Gname:true,
        price:18.59
    })
    try{
        const result= await c.save()
        console.log(result)  
    }
  catch(ex){
    console.log(ex.message);
  }
    
}
//createDate()

//Display data

async function getData(){
    const res=await Sam.find({_id:'5de8d020dc7ffb4b9089880b'})
    .sort({first_name:1})
    .select({first_name:1, middle_name:1,last_name:1, price:1})
    console.log(res[0].price);
}
getData()

//Display data by ID

// async function getData(id){
//     const res=await Sam.findById(id)
//     .sort({first_name:1})
//     .select({first_name:1, middle_name:1,last_name:1})
//     console.log(res);
// }
// getData('5de636a0c781f02708b5cd4f')

//Update data

// async function updateData(id){
//     const res = await Sam.findByIdAndUpdate(id,{
//         $set:{
//             first_name:'SaM'
//         }
//     },{new : true})
//     console.log(res)    
// }
// updateData('5de636a0c781f02708b5cd4f')

//delete data

// async function deleteData(id){
//     const res= await Sam.findOneAndDelete(id)
//     console.log(res);    
// }
//deleteData('5de634bafd906e4514eab3a9')

//Get Data

app.get('/api',(req,res)=>{
    Sam.find((err,docs)=>{
        if(!err)res.send(docs);
        else console.log('Error while getting data..',JSON.stringify(err,undefined,2))       
    });
    
})

app.post('/api',(req,res)=>{
             const ress=new Sam({
                first_name:req.body.first_name,
                middle_name:req.body.middle_name,
                last_name:req.body.last_name,
                phone:req.body.phone,
                address:req.body.address,
                Gname:req.body.Gname
             })
             ress.save((err,docs)=>{
                 if(!err)res.send(docs)
                 else console.log('Error while sending data', JSON.stringify(err,undefined,2))
             })
    

})

// app.put('/api/:id',(req,res)=>{
//     if(!objectID.isValid(req.params.id))
//     return res.status(400).send(`NO record with given id ; ${req.params.id}`)

//     var ree={
//         first_name:req.body.first_name,
//         middle_name:req.body.middle_name,
//         last_name:req.body.last_name,
//         phone:req.body.phone,
//         address:req.body.address,
//         Gname:req.body.Gname
//     }
//     Sam.findByIdAndUpdate(req.params.id, {$set:ree},{new : true}, (err,docs)=>{
//         if(!err)res.send(docs);
//         else console.log('Error while updating data',JSON.stringify(err, undefined,2));
//     })
// })

// app.put('/api/:id',(req,res)=>{
//     Sam.findByIdAndUpdate(req.params.id, {
//         $set:{
//             first_name:req.body.first_name,
//             middle_name:req.body.middle_name,
//             last_name:req.body.last_name,
//             phone:req.body.phone,
//             address:req.body.address,
//             Gname:req.body.Gname
//         }
//     },{new : true},(err,docs)=>{
//         if(!err)res.send(docs);
//         else console.log('Error while updating data',JSON.stringify(err, undefined,2));
//     })
// })

// app.delete('/api/:id',(req,res)=>{
//     Sam.findByIdAndDelete(req.params.id,(err,docs)=>{
//         if(!err)res.send(docs);
//         else console.log('Error while updating data',JSON.stringify(err, undefined,2));
//     })
// })

// app.get('/api/:id',(req,res)=>{
//     Sam.findById(req.params.id,(err,docs)=>{
//         if(!err)res.send(docs)
//         else console.log('Error while featching the record...',JSON.stringify(err,undefined,2))      
//     })
// })