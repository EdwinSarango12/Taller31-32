import {Schema , model} from 'mongoose'
import bcrypt from 'bcryptjs'


const veterinarioSchema = new Schema({
    nombre:{
        type:String,
        required:true,
        trim:true
    },
    apellido:{
        type:String,
        required:true,
        trim:true
    },
    direcccion:{
        type:String,
        trim:true,
        default:null
    },
    celular:{
        type:String,
        trim:true,
        default:null
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        default:true,
    },
    token:{
        type:String,
        default:null,
    },
    confirmEmail:{
        type:Boolean,
        default:false,
    },
    rol:{
        type:String,
        default:"veterinario",
    }
},{
    timestamps:true 
})


// Método para cifrar el password del veterinario
veterinarioSchema.methods.encrypPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}

// Método para verificar si el password ingresado es el mismo de la BDD
veterinarioSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password,this.password)
    return response
}

// Método para crear un token 
veterinarioSchema.methods.crearToken = function(){
    const tokenGenerado = this.token = Math.random().toString(32).slice(2)
    return tokenGenerado
}


export default model('Veterinario',veterinarioSchema)


