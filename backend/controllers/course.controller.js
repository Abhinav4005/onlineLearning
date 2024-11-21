import Course from "../model/course.model.js";

export const createCourse = async(req,res)=>{
    const {title, description, instructor, thumbnail, videos} = req.body;

    try {
        const course = new Course({
            title,
            description,
            instructor,
            thumbnail,
            videos
        });

        await course.save();
        res.status(201).json({message:"Course created successfully"});
    } catch (error) {
        console.log("Error in createCourse controller", error.message);
        res.status(500).json({error:"Internal server error"})
    }
};

export const getCourse = async(req, res)=>{
    try {
        const course = await Course.find().populate('instructor', 'name email');
        res.status(200).json(course);
    } catch (error) {
        console.log("Error in getCourse controller", error.message);
        res.status(500).json({error:"Internal server error"});
    }
};

export const getCourseById  = async(req,res)=>{
    const {courseId} = req.params;
    try {
        const course = await Course.findById(courseId).populate('instructor', 'name email');
        if(!course){
            return res.status(400).json({error:"Course not found"});
        }
        res.status(200).json(course);
    } catch (error) {
        console.log("Error in getCourseById controller", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const updateCourse = async(req,res)=>{
    const {courseId} = req.params;
    console.log("id ->", courseId);
    const {title, description, instructor, thumbnail, videos} = req.body;
    try {
        const course = await Course.findByIdAndUpdate(
            courseId,
            {
                title,
                description,
                instructor,
                thumbnail,
                videos,
            },
            {new:true}
        );

        if(!course){
            console.log("course -> ",!course)
            return res.status(400).json({error:"Course not found"});
        };
        res.status(200).json({message:"Course updated successfully!", course});
    } catch (error) {
        console.log("Error in updateCourse controller", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const deleteCourse = async(req,res)=>{
    const {id} = req.params;
    try {
        const course = await Course.findByIdAndDelete(id);

        if(!course){
            res.status(400).json({error:"Course not found"});
        }
        res.status(200).json({message:"Course deleted successfully"});
    } catch (error) {
        console.log("Error in deleteCourse controller", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}