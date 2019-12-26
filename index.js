const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/playground',{ useUnifiedTopology: true,useNewUrlParser: true })
.then(()=>{console.log('Connacted successfully...')})
.catch((err)=>{console.log('Error in Connection..',err)})
//creating schema
const courseSchema=new mongoose.Schema({
    name: String,
    author: String,
    tags:[String],
    date:{type:Date, default:Date.now},
    publish: Boolean
})

const Course=mongoose.model('Courses', courseSchema);
//strong data
async function createdata(){
    const course=new Course({
        name: 'Angular 8',
        author: 'SAM ILU',
        tags:['Angular','Es6'],
        publish: true
    })
    
    const result=await course.save();
    console.log(result);
}
//createdata()

//retriving
//logical oprators
//eq (equal)
//nq (not equal)
//gt (greater than)
//gte (grater then or equal)
//lt (less than )
//lte (less than r equal)
//in
//nin (not in)
/*Logical Query Oprator*/
//or
//and

/* Regular exp */
//paterns,like
async function getCourse(){
 const res=await Course
 //.find(/*{author:'manju'}*/)
//  .find({prise : {$gte:10, $lte:20}})// filetartion are in find method
// .find({prise: {$in :[10,15,20]}})
//  .find()
// .find()
// .or([{author:'manju'},{author:'Sammu'}])
// .find({author: /^manju/})
// .find({author:/u$/})
// .find({author:/.*sammu*./i})//like i means case insensative
.find()
 .limit(10)
 .sort({name:1})
//  .select({name:1, tags:1,author:1})
.count()
  console.log(res);
}
getCourse()