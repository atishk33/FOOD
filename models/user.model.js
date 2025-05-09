const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema= new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"name is required"],
           
        },
        email:{type:String,
            required:[true,"email is required"],
            unique:true,
        },
        password:{type:String,
        required:[true,"passward is required"],
        // minlength:[7,"minimum length should be 7"],
    },
    phoneNumber:{type: String,
        // required:[true,"phone number is required"],
        miniLength:[10,"minimum length should be 10"],
    },
        carData:{type:Object,
        defaultL:{}
        },
        tokenVersion:{
            type:Number,
            default:0,
        },
        role:{
            type:String,
            default:"user",
            
        },
    });


    //! pasward hashing

    userSchema.pre("save", async function () {
        if (!this.isModified("password")) return; // optional but efficient
        const salt = await bcryptjs.genSalt(12);
        const hashedPassword = await bcryptjs.hash(this.password, salt);
        this.password = hashedPassword;
    });
    

    userSchema.methods.comparePassword = async function (enteredPassword) {
        return await bcryptjs.compare(enteredPassword, this.password);
    };
    

    module.exports=mongoose.model("user",userSchema);  