export const Footer:React.FC = ()=>{

    const footerLinks = {
        AboutUs:[
            {name:"Careers",href:""},
            {name:"Blog",href:""},
            {name:"Team",href:""},
            {name:"Terms",href:""},
            {name:"Privacy",href:""},
        ],
        Features:[
            {name:"Exchange",href:""},
            {name:"Academy",href:""},
            {name:"Charity",href:""},
            {name:"Card",href:""},
            {name:"Labs",href:""},
        ],
        Partners:[
            {name:"Persistent ventures",href:""},
            {name:"System Altruism",href:""},
            {name:"GIffy",href:""},
            {name:"ML research labs",href:""},
            {name:"IIIT BOMBAY",href:""},
            {name:"TensorAI",href:""}
        ],
    }

    return(
        <section className="w-full bg-blue-800">
            <div className="footer">
                <div className="footer-links p-8 px-14 flex justify-between">
                {
                    (Object.keys(footerLinks) as (keyof typeof footerLinks)[]).map((ele)=>(
                        <article key={ele} className="flex flex-col">
                            <span className="text-white capitalize inline-block mb-3">{ele}</span>
                            {footerLinks[ele]?.map(link=>(<span className={`text-white text-xs tracking-tight my-1 font-semibold`} key={link.name}>{link.name}</span>))}
                        </article>
                    ))
                }
                </div>
                <div className="footer-bottom p-3 px-14 flex border-t-2 border-[#242424] items-center justify-between">
                    <article className="flex gap-4">
                        <span className={`text-white uppercase text-xs`}>Privacy policy</span>
                        <span className={`text-white uppercase text-xs`}>terms and conditions</span>
                        <span className={`text-white uppercase text-xs`}>Service aggrements</span>
                    </article>
                    <article>
                        <span className={`text-white uppercase text-xs`}>COPYright &#169; 2024 Insight</span>
                    </article>
                    <article>
                        {
                            ["facebook","instagram","twitter","tiktok"]
                            .map(
                                ele=>(
                                    <span key={ele} className="footer-icon">
                                        <i></i>
                                    </span>
                                    )
                            )
                        }
                    </article>
                    <article className="flex gap-3">
                        <span className={`text-white uppercase text-xs`}>ENGLISH</span>
                    </article>
                </div>
            </div>
        </section>
    )
}