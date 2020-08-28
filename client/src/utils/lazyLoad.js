function lazyLoad(node) { 
    const src = node.getAttribute('data-src')
    let intersecting = false;

    const handleIntersection = (entries) => {
        intersecting = entries[0].isIntersecting;

        if(entries[0].intersectionRatio > 0) {
            node.src = src;
            node.className = node.className + ' loaded';
            console.log(node.className);
        }

        if (intersecting) {
            observer.unobserve(node);
        }
    } 

    const observer = new IntersectionObserver(handleIntersection);
    observer.observe(node);

    return {
        destroy() {
            observer.unobserve(node);
        }
    };
}

export default lazyLoad;