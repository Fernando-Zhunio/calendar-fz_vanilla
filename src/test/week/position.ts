
export function viewPosition() {
    console.log('view-position')
    const span = document.createElement('span');
    span.style.zIndex = '100';
    span.style.pointerEvents = 'none';
    document.body.appendChild(span);
    
    document.addEventListener('mousemove', (e) => {
        const x = e.pageX;
        const y = e.pageY;
        // console.log({x,y})
        span.style.left = `${e.clientX+10}px`
        span.style.top = `${e.clientY+10}px`
        span.style.position = 'fixed'
        span.style.background = 'white'
        span.style.padding = '4px'
        span.textContent = `x:${x} - y:${y}`
    })
}