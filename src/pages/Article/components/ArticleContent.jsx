import { useRef, useEffect } from 'react'

function replaceImgSrc(dom) {
    let imgs = dom.getElementsByTagName('img');
    imgs = Array.from(imgs);
    imgs.map(img => {
        const src = img.getAttribute('orig-src');
        img.setAttribute('src', src);
    })
}

function toVideo(dom) {
    let videos = dom.getElementsByClassName('video');
    videos = Array.from(videos);
    videos.map(video => {
        const realVideo = document.createElement('video');
        const [thumb, src] = [
            video.getAttribute('thumb'),
            video.getAttribute('src'),
        ];
        realVideo.setAttribute('poster', thumb);
        realVideo.setAttribute('src', src);
        realVideo.setAttribute('autoplay', 'autoplay');
        realVideo.setAttribute('controls', 'controls');
        dom.insertBefore(realVideo, video);
        dom.removeChild(video);
    })
}

const ArticleContent = ({body=''}) => {
    
    const articleRef = useRef();

    useEffect(() => {
        articleRef.current.innerHTML = body;
        replaceImgSrc(articleRef.current);
        toVideo(articleRef.current)
    }, [body])

    return (
        <article id="article" ref={articleRef}>
        </article>
    )
}

export default ArticleContent;