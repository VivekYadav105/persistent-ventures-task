const scanRouter = require('express').Router()
const {client} = require('../utils/db')
const {auth} = require('../middleware/auth.middleware')
const {parser} = require('../utils/storage')

scanRouter.get('/',auth,async(req,res,next)=>{
    try{
        const history = await client.scan.findMany({where:{userId:req.user.userId}})
        return res.json({message:"History Fetched Successfully",history})
    }
    catch(err){
        next(err)
    }
})

scanRouter.get('/:id',auth,async(req,res,next)=>{
    try{
        const scanId = req.params.id
        const scan = await client.scan.findUnique({where:{id:Number(scanId)}})
        const results = await client.result.findMany({where:{scanId:Number(scanId)}})
        if(!scan){
            res.statusCode = 404
            throw new Error("Scan not found")
        }
        return res.json({message:"scan fetcheed Successfully",scan:{...scan,results}})
    }
    catch(err){
        next(err)
    }
})

scanRouter.post('/create',auth,parser.single('file'),async(req,res,next)=>{
    try{
        const user = await client.user.findUnique({where:{email:req.user.email}})
        if(user.creditsLeft<=0){
            res.statusCode = 402
            throw new Error("Insufficient Credits")
        }
        console.log(req.file,req.body)
        const createScan = await client.scan.create({
            data:{
                userId:req.user.userId,
                image:req.file?req.file.path:req.body.url
            }
        })

        await new Promise(resolve=>setTimeout(resolve,3000))
        const sample_images = [
            'https://upload.wikimedia.org/wikipedia/commons/a/ad/Prabhas_at_Saaho_Pre_release_event_%28cropped%29.jpg',
            'https://www.instagram.com/darlingprabhas17/p/DAnWPJOOqHd/',
            'https://img.onmanorama.com/content/dam/mm/en/entertainment/2021/prabhas.jpg.transform/845x440/image.jpg',
            'https://img.indiaforums.com/person/480x360/1/2525-prabhas.jpg?c=4bM0D6',
            'https://cdn.siasat.com/wp-content/uploads/2024/10/Prabhas-3-1.jpg'
        ]

        const results = []
        results.push(sample_images[Math.floor(Math.random()*sample_images.length)])
        results.push(sample_images[Math.floor(Math.random()*sample_images.length)])
        results.push(sample_images[Math.floor(Math.random()*sample_images.length)])

        const inserted = await client.result.createMany({
            data:results.map((ele,index)=>({image:ele,scanId:createScan.id,photoId:index}))
        })

        const scan_results = await client.result.findMany({where:{scanId:createScan.id}})
        
        const updatedUser = await client.user.update({
            where:{userId:req.user.userId},
            data:{
                creditsLeft:user.creditsLeft-1
            }
        })

        const updateScan = await client.scan.update({
            where:{id:createScan.id},
            data:{
                count:inserted.count
            }
        })

        return res.json({message:"Scan created successfully",scan:{...updateScan,results:scan_results}})
    }
    catch(err){
        next(err)
    }
})

module.exports = scanRouter