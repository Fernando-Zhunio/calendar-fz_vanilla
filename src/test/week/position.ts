
export function viewPosition() {
    console.log('view-position')
    const span = document.createElement('span');
    span.style.zIndex = '100';
    document.body.appendChild(span);
    
    document.addEventListener('mousemove', (e) => {
        const x = e.pageX;
        const y = e.pageY;
        span.style.left = `${x}px`
        span.style.top = `${y}px`
        span.style.position = 'fixed'
        span.style.background = 'white'
        span.style.padding = '4px'
        span.textContent = `x:${x} - y:${y}`
    })
}