import { gsap } from "gsap";
import { useState, useEffect, useRef } from "react";

export const VideoPreview = ({children}) => {
    const [isHovering, setIsHovering] = useState(false);

    const sectionRef = useRef(null); //Reference to the container section
    const contentRef = useRef(null); // Reference to the inner section

    //Handles the mouse movement over the container
    const handleMouseMove = ({clientX, clientY, currentTarget}) => {
        const rect = currentTarget.getBoundingClientRect();

        const xOffset = clientX - (rect.left + rect.width /2); //calculate X offset
        const yOffset = clientY - (rect.top + rect.height /2); //calculate Y offset

        if(isHovering){
          
            gsap.to(sectionRef.current, {
                x: xOffset, y: yOffset,
                rotationX: xOffset / 2, rotationY: yOffset /2,
                transformPerspective: 500,
                duration: 1,
                ease: "power1.out",

            });

            gsap.to(contentRef.current, {
                x: -xOffset, y: -yOffset,
                duration: 1, ease: "power1.out",
            });
        }

    };

    useEffect(()=> {
        //Reset the position of the content when hover ends

        if(!isHovering) {
            gsap.to(sectionRef.current, {
                x:0, y:0, rotationX:0, rotationY:0, duration:1 , ease: "power1.out",
            });

            gsap.to(contentRef.current, {
                x:0, y:0, duration: 1, ease: "power1.out",
            });
        }
    }, [isHovering]);

    return (
        <section ref={sectionRef} onMouseMove={handleMouseMove}
         onMouseEnter={()=> setIsHovering(true)} onMouseLeave={()=> setIsHovering(false)}
         className="absolute z-50 size-full overflow-hidden rounded-lg"
         style={{perspective: "500px"}}>

            <div ref={contentRef} className="origin-center rounded-lg"
             style={{ transformStyle: "preserve-3d",}}>
                {children}
             </div>
        </section>
    );
};

export default VideoPreview;