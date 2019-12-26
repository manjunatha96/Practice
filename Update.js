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
// async function getData(){
//     return await Course.find({author:'Amar'})
//     .sort('-name')
// }

// async function disp(){
//     const res= await getData()
// console.log(res);
// }
// disp();

/* Update by ID */
// async function updateData(id){
//     const course=await Course.findById(id)
//     if(!course) return;
//     course.author='SaM'
//     course.name='IHATEU'
//     const res= await course.save();
//     console.log(res);   
// }
// updateData('5de5e4ec08b1af43dc18d339')
/* Delete by id*/

// async function deleteData(id){
//     const course= await Course.findById(id);
//     if(!course) return;
//     const res= await course.remove();
//     console.log(res);
// }
// deleteData('5de5e4ec08b1af43dc18d339')
/* udate 3 approch*/
// async function updateData(id){
//     const res=await Course.update({_id: id},{
//         $set:{
//             author:'Sammu',
//             publish:true
//         }
//     }
// )
//     console.log(res);   
// }
// updateData('5de6094e423b962ae85f0a95')

/* udate 4 approch*/
// async function updateData(id){
//     const res=await Course.findByIdAndUpdate(id,{
//         $set:{
//             author:'SaM',
//             publish:true
//         }
//     },{new : true})
//     console.log(res);   
// }
// updateData('5de609197033ac39f0b34bcc')

async function deleteData(id){
//  const res= await Course.deleteOne({_id:id})
const res=await Course.findByIdAndRemove(id);
 console.log(res);
}
deleteData('5de6094e423b962ae85f0a95')