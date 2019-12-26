const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/playground',{ useUnifiedTopology: true,useNewUrlParser: true })
.then(()=>{console.log('Connacted successfully...')})
.catch((err)=>{console.log('Error in Connection..',err)})

const courseSchema=new mongoose.Schema({
    name: String,
    author: String,
    tags:[String],
    date:{type:Date, default:Date.now},
    publish: Boolean

})

const Course=mongoose.model('Courses',courseSchema);
async function getData(){
    return await Course.find()
    .sort({name:1})
    .or([{author:'Sammu'},{author: 'manju'}])
}

async function disp(){
    const res= await getData()
console.log(res);
}
disp();