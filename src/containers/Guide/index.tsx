
import guideIcon from '../../assets/images/guide-icon.png'
import sloganIcon from '../../assets/images/slogan-icon.png'
import {useCallback, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";

function Guide() {
    const router = useNavigate()
    const ref = useRef<HTMLDivElement>(null);
    useEffect(()=>{
            if(ref.current){
                ref.current.style.opacity = '1'
            }
    })
    const jump = useCallback(()=>{
        router('/login')
    },[])
    return (
        <div  ref={ref} className='w-screen h-screen overflow-hidden opacity-0 duration-1000 bg-white'>
            <img src={guideIcon} alt="" className='block w-[86px] h-[70px] mt-[93px] mb-[12px]  mx-auto my-0'/>
            <div className='text-[#242424] font-[regular] text-[20px] leading-[23px] text-center' >欢乐购</div>
            <img src={sloganIcon} alt="" className='block w-[202px] h-[118px] mt-[173px] mb-0 mx-auto'/>
            <div onClick={jump}  className='text-center mt-[20px] text-xs '>{'>'}</div>
        </div>
    )
}

export default Guide
