import illustration from '../../assets/Animation - 1731494310361.gif'
import { BsArrowRight } from 'react-icons/bs'
import { Footer } from '../../components/footer'
import {motion} from 'motion/react'
import { useNavigate } from 'react-router-dom'

const HomePage = ()=>{
    const navigate = useNavigate()

    return(
        <>
        <section className="w-full home-section min-h-screen pt-[6rem] flex items-center justify-center">
            <div className='max-w-[900px] flex items-center'>
                <div className="flex flex-col flex-1">
                    <motion.h1 
                    initial={{ x: -30,opacity: 0 }}
                    whileInView={{ x: 0,opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className='text-6xl pb-5 uppercase text-blue-800'>
                        Insight
                    </motion.h1>
                    <motion.p 
                    initial={{ x: -30,opacity: 0 }}
                    whileInView={{ x: 0,opacity: 1 }}
                    transition={{ duration: 0.5, delay:0.1 }}
                    className='text-2xl py-3'>A Face Regonistion Software to get perform cool facial recognision features</motion.p>
                    <div className=''>
                        <motion.button
                        initial={{ x: -30,opacity: 0 }}
                        whileInView={{ x: 0,opacity: 1 }}
                        transition={{ duration: 0.5,delay:0.2 }} 
                        onClick={()=>navigate('/main/scan')} className='text-md hover:shadow-md hover:bg-blue-400 hover:shadow-blue-500 duration-300 flex items-center gap-2 bg-blue-700 text-white rounded-md shadow-lg p-3 px-5 font-medium'>
                            Scan now
                            <BsArrowRight/>
                        </motion.button>
                    </div>
                </div>
                <div className="illustration flex-1 flex items-center">
                    <motion.img 
                    initial={{ y: -30,opacity: 0 }}
                    whileInView={{ y: 0,opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    src={illustration} width={400} height={400}/>
                </div>
            </div>
        </section>
        <section className="w-full min-h-screen">
            <h1 className='text-center text-4xl my-5 capitalize'>About Us</h1>
            <p className='text-center mb-5'>Meet our team who is working to develop this cool product</p>
            <div className='flex max-w-[1000px] flex-wrap justify-center gap-5 m-auto'>
                <motion.article 
                initial={{ x: -30,opacity: 0 }}
                whileInView={{ x: 0,opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2 }}
                className='h-[250px]  w-[300px] relative border-2'>
                    <article className='absolute h-full w-full backdrop-grayscale hover:backdrop-grayscale-0 duration-300 z-1'></article>
                    <img className='object-cover h-full w-full' src='https://t3.ftcdn.net/jpg/03/02/88/46/360_F_302884605_actpipOdPOQHDTnFtp4zg4RtlWzhOASp.jpg'/>
                    <article className='absolute w-[280px] bottom-2 left-2 bg-white border-2 p-3 flex flex-col'>
                        <span>Nathan Stocks</span>
                        <span>Senior R&D Engineer</span>
                    </article>
                </motion.article>
                <motion.article 
                initial={{ x: -30,opacity: 0 }}
                animate={{ x: 0,opacity: 1 }}
                transition={{ duration: 0.2 }}
                className='h-[250px] backdrop-grayscale hover:backdrop-grayscale-0 duration-300 w-[300px] relative border-2'>
                    <article className='absolute h-full w-full backdrop-grayscale hover:backdrop-grayscale-0 duration-300 z-1'></article>
                    <img className='object-cover h-full w-full' src='https://plus.unsplash.com/premium_photo-1690579805307-7ec030c75543?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29uJTIwaWNvbnxlbnwwfHwwfHx8MA%3D%3D'/>
                    <article className='absolute w-[280px] bottom-2 left-2 bg-white border-2 p-3 flex flex-col'>
                        <span>Nayan gupth</span>
                        <span>Full Stack Engineer</span>
                    </article>
                </motion.article>
                <motion.article 
                initial={{ x: -30,opacity: 0 }}
                whileInView={{ x: 0,opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='h-[250px]  w-[300px] relative border-2'>
                    <article className='absolute h-full w-full backdrop-grayscale hover:backdrop-grayscale-0 duration-300 z-1'></article>
                    <img className='object-cover h-full w-full' src='https://media.istockphoto.com/id/685132245/photo/mature-businessman-smiling-over-white-background.jpg?s=612x612&w=0&k=20&c=OJk6U-oCZ31F3TGmarAAg2jVli8ZWTagAcF4P-kNIqA='/>
                    <article className='absolute w-[280px] bottom-2 left-2 bg-white border-2 p-3 flex flex-col'>
                        <span>Neeraj Kappor</span>
                        <span>Marketing</span>
                    </article>
                </motion.article>
                <article className='h-[250px] backdrop-grayscale hover:backdrop-grayscale-0 duration-300 w-[300px] relative border-2'>
                    <article className='absolute h-full w-full backdrop-grayscale hover:backdrop-grayscale-0 duration-300 z-1'></article>
                    <img className='object-cover h-full w-full' src='https://media.istockphoto.com/id/685132245/photo/mature-businessman-smiling-over-white-background.jpg?s=612x612&w=0&k=20&c=OJk6U-oCZ31F3TGmarAAg2jVli8ZWTagAcF4P-kNIqA='/>
                    <article className='absolute w-[280px] bottom-2 left-2 bg-white border-2 p-3 flex flex-col'>
                        <span>Ninish Kamal</span>
                        <span>R&D Engineer</span>
                    </article>
                </article>
            </div>
        </section>
        <section className='w-full min-h-screen'>
            <h1 className='text-center text-4xl my-5 capitalize'>Features we are working on</h1>
            <div className='flex flex-wrap items-center justify-evenly py-10 gap-4 max-w-[800px] m-auto'>
                <article className='h-[300px] flex flex-col items-center w-[250px] bg-sky-300/40 backdrop-blur-md rounded-md p-5 shadow-md'>
                    <h1 className='text-center mb-3 text-2xl font-medium'>Emotion Recognisiton</h1>
                    <img className='object-contain h-[150px]' src="https://cdn-icons-png.flaticon.com/512/10817/10817524.png" alt="" />
                </article>
                <article className='h-[300px] flex flex-col w-[250px] bg-green-300/40 backdrop-blur-md rounded-md p-5 shadow-md'>
                    <h1 className='text-center mb-3 text-2xl font-medium'>Eye Gaze and Blink Detection</h1>
                    <img className='object-contain h-[150px]' src="https://cdn-icons-png.flaticon.com/512/5062/5062877.png" alt="" />
                </article>
                <article className='h-[300px] w-[250px] bg-teal-300/40 flex flex-col items-center backdrop-blur-md rounded-md p-5 shadow-md'>
                    <h1 className='text-center mb-3 text-2xl font-medium'>Attention Tracking</h1>
                    <img className='object-contain h-[150px]' src="https://cdn-icons-png.flaticon.com/512/2936/2936214.png" alt="" />
                </article>
                <article className='h-[300px] flex flex-col items-center w-[250px] bg-red-300/40 backdrop-blur-md rounded-md p-5 shadow-md'>
                    <h1 className='text-center mb-3 text-2xl font-medium'>Global image recognistion</h1>
                    <img className='object-contain h-[150px]' src="https://cdn-icons-png.flaticon.com/512/1461/1461141.png" alt="" />
                </article>
            </div>
        </section>
        <Footer/>
        </>
    )
}

export default HomePage