import Cover from "@/components/Common/Cover"

const VideoWrap = ({list=[]}) => {
    return (
        <div className="video-wrap">
            {
                list.map(item => <Cover key={item.id} {...item} />)
            }
        </div>
    )
}

export default VideoWrap;