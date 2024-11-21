import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course',
        required:true,
    },
    questions:[
        {
            question:{
                type:String,
                required:true,
            },
            option:[
                {
                    type:String,
                }
            ],
            correctAnswer:{
                type:String,
                required:true,
            }
        }
    ],
}, { timestamps:true});

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;